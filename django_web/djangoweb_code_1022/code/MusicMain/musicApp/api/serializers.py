from dataclasses import field
from rest_framework import serializers
from musicApp.models import Article, Singer, Acct
from django.contrib.auth.models import User


class SingerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Singer
        fields = ['singer_id', 'singer_name']
        # fields = '__all__' #選擇全部欄位

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # username = serializers.CharField()
    password = serializers.CharField()
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class CrawlerSerializer(serializers.Serializer): #新增文章的類資料表(爬蟲)
    art_craw = serializers.URLField()
    
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__' #選擇全部欄位
        
class ChangePassSerializer(serializers.Serializer): # 修改密碼
    model = User
    # password = serializers.CharField()
    old_password = serializers.CharField(required=True) 
    new_password = serializers.CharField(required=True)
    

# google login token
class TokenSerializer(serializers.Serializer):
    token = serializers.CharField()