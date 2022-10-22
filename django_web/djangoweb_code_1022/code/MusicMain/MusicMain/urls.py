"""MusicMain URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from musicApp import views
# from django.contrib.auth import views

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from musicApp.api.views import SingerViewSet, UserViewSet, ArticleViewSet, CrawlerViewSet, ChangePasswordView

from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Posts API",
        default_version='1.0.0',
        description="API documentation of App",
    ),
    public=True,
)


# serializers.py
router = DefaultRouter(False) #加False，路徑最後就不用加斜線
router.register('singer', SingerViewSet)
router.register('auth', UserViewSet)
router.register('crawler', CrawlerViewSet)
router.register('article', ArticleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls), #管理者後台
    path('', views.acct_login, name="acct_login"), #登入
    path('acct_login/', views.acct_login, name="acct_login"), #登入
    path('index/', views.index, name="index"), #首頁
    path('mailCon/<int:articleid>/', views.mailCon, name="mailCon"), # 公告欄的其中一個信件內容
    path('mailContent/<int:articleid>/', views.mailContent, name="mailContent"), #個人的其中一個信件內容 
    path('draftRecord/', views.draftRecord, name="draftRecord"), #草稿記錄
    path('draftsend/<str:mtype>/', views.draftsend), #草稿送出
    # path('draftsend/<int:articleid>/<str:mtype>/', views.draftsend), #草稿送出(第二次儲存之後)
    path('pBoard/', views.pBoard, name="pBoard"), #公告欄
    path('pFile/', views.pFile, name="pFile"), #個人檔案(修改密碼)
    path('pFileMood/', views.pFileMood, name="pFileMood"), #個人情緒圖
    path('pAllMood/', views.PAllMood, name="pAllMood"), #整體情緒圖
    path('pMailRecord/', views.pMailRecord, name="pMailRecord"), #信件紀錄
    path('pMailRecord/<str:ptype>/', views.pMailRecord), #信件紀錄(時間篩選)
    # path('pMessage/', views.pMessage, name="pMessage"), #個人的留言回覆紀錄，先跳過
    path('profile/', views.profile, name="profile"), #個人首頁(個人天地)
    path('pWrite/', views.pWrite, name="pWrite"), #個人寫信 <int:writeid>/
    path('dWrite/<int:articleid>/', views.dWrite, name="dWrite"), #個人草稿的其中一個編輯畫面
    # path('resultMsg/', views.resultMsg, name="resultMsg"), #送出後跳出的視窗(待定，先跳過)
    path('signPage/', views.signPage, name="signPage"), #註冊頁面
    
    path('api/', include(router.urls)),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-jso'),
	path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
# http://127.0.0.1:8000/swagger/ 能看到目前能使用的api