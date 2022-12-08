from django.test import TestCase

# Create your tests here.


# class SeaArtViewSet(viewsets.GenericViewSet): #文章查詢 generics.RetrieveAPIView
#     queryset = Article.objects.all()
#     serializer_class = SeaArtSerializer
#     # serializer_class = TokenSerializer
#     # model = User
    
#     @action(
#         methods = ["POST"], detail = False, url_path = "sea-article", permission_classes = [IsAuthenticated]
#     )
    
#     def sea_article(self, request):        
        
#         serailzer = self.get_serializer(data = request.data)
#         serailzer.is_valid(raise_exception = True)
        
#         u_email = Acct.objects.get(email=request.user.email)
        
#         email = serailzer.data["email"]
#         print(email)
        
#         field_name = 'id' # "email_id"
#         field_object = Acct._meta.get_field(field_name)
#         field_value = field_object.value_from_object(u_email)
#         # print(field_value)
        
#         result = Article.objects.filter(email_id = field_value)
        
#         print(result)
        
#         res = " "
#         for x in result:
#             res +=  "歌手:" + x.singer_name + " " + "歌名:" + x.song_name + " " + "歌曲連結:" + x.link + " " + "情緒分類:" + x.sencla + " " + "文章連結:" + x.article_link + '         '
        
#         return Response(data={"result": res})