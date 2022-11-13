from musicApp.api.serializers import LoginSerializer, SingerSerializer, UserSerializer, ArticleSerializer,CrawlerSerializer, ChangePassSerializer, TokenSerializer
from musicApp.models import Acct, Article, Singer
from rest_framework import viewsets, status, generics
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from musicApp.song_crawler import song_compar
import requests
from django.core.exceptions import ObjectDoesNotExist


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SingerViewSet(viewsets.ModelViewSet):
    # ModelViewSet 已包含增刪改查四種功能
    queryset = Singer.objects.all()
    serializer_class = SingerSerializer
 
class UserViewSet(viewsets.GenericViewSet): 
    queryset = Acct.objects.all()  
    serializer_class = UserSerializer
    
    def get_serializer_class(self): # 判斷要google 登入或是用一般登入
        if self.action == "google_login":
            return TokenSerializer
        return super().get_serializer_class()
    
    @action( # 新增使用者
        methods = ["POST"], detail = False, url_path = "add-user"
    ) # detail:是否列出POST參數，url_path是寫在路徑中
    
    def add_user(self, request):
        serailzer = self.get_serializer(data = request.data)
        serailzer.is_valid(raise_exception = True)
        
        email = serailzer.data["email"]
        username = serailzer.data["username"]
        password = serailzer.data["password"]
        ct_user = Acct.objects.filter(email=email).count()
        if ct_user == 0:
            Acct.objects.create_user(username = username, email = email, password = password)
            return Response(data={"message":"add success"})
        else:
            return Response(data={"message":"帳戶已存在，請使用其他電子信箱"})
        # return Response(data={"username":Acct.username, "email":Acct.email})
        # 很彈性看要回傳啥都可
        
    @action( # 登入功能
        methods=["POST"], detail=False, url_path="login"
    )
    def login(self, request):
        serailzer = LoginSerializer(data = request.data)
        serailzer.is_valid(raise_exception = True)
        
        email = serailzer.data["email"]
        password = serailzer.data["password"]
        
        ct_user = Acct.objects.filter(email=email).count()
        if ct_user == 1:
            acct = authenticate(request, email = email, password = password)
            if acct:
                token = get_tokens_for_user(acct)
                return Response(data={"result": "login success", "token":token["access"]})
            else:
                return Response(data={"result": "login fail"})
        else:
            return Response(data={"result": "沒有此使用者，請去註冊"})
    
    @action( # google登入功能
        methods=["POST"], detail=False, url_path="google_login"
    )
    def google_login(self, request):
        s = self.get_serializer(data = request.data)
        s.is_valid(raise_exception = True) #取到token
        
        email = check_token(s.validated_data['token']) # 傳去檢查token是否正確
        
        try:
            acct = Acct.objects.get(email = email)
            token = get_tokens_for_user(acct)
            return Response(data={"result": "login success", "token":token["access"]})
        except ObjectDoesNotExist:
            return Response(data={"result":"login fail"}, status=status.HTTP_404_NOT_FOUND)
    
    # 測試用，用token登入(JWT密鑰)，postman的authorization選Bearer token放token
    @action(
    methods=["GET"], detail=False, url_path="test", permission_classes = [IsAuthenticated]
    )
    def test(self, request):
        return Response(data={"result":"test"})
   
def check_token(token: str):
   res = requests.get(
       "https://www.googleapis.com/oauth2/v1/userinfo",
       {
           'alt': 'json', 
           'access_token': token #帶這兩個參數去問google api是否正確
       }
   ) 
   
   user_info = res.json()
   
   if not user_info.get('email'): 
      return Response(data={"result":"google get email error"}, status=status.HTTP_401_UNAUTHORIZED)
   print(user_info)
   return user_info['email']

class ChangePasswordView(generics.UpdateAPIView): # PATCH
    
    serializer_class = ChangePassSerializer
    model = User
    permission_classes = (IsAuthenticated,) # 需帶此token
    
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
class CrawlerViewSet(viewsets.GenericViewSet): #新增文章
    queryset = Article.objects.all()
    serializer_class = CrawlerSerializer
    # model = Acct
    
    @action(
        methods = ["POST"], detail = False, url_path = "add-article", permission_classes = [IsAuthenticated]
    )
    
    def add_article(self, request):
        # self.object = self.get_object()
        serailzer = self.get_serializer(data = request.data)
        serailzer.is_valid(raise_exception = True)
        
        artCraw = serailzer.data["art_craw"]
        resCraw = song_compar.find_song(artCraw)
        # print(type(resCraw))
        usr_email = Acct.objects.get(email=request.user.email)
        print(usr_email)
        Article.objects.create(article_context = resCraw['article'], singer_name = resCraw['singer'], song_name = resCraw['song'], link = resCraw['songURL'], sencla = resCraw['art_mood'], email = usr_email)
        # rectime 不用寫日期去存，django會自動幫我們以最新的時間存進資料庫中
        
        return Response(data={"result": resCraw})
    
class ArticleViewSet(viewsets.ModelViewSet):
    # ModelViewSet 已包含增刪改查四種功能
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer