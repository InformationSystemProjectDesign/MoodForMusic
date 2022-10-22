from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse


# Create your models here.
# 使用者
class Acct(AbstractUser):
    email = models.EmailField(unique=True) #主鍵
    username = models.CharField('姓名', max_length=20) #暱稱
    update_time = models.DateField('最後修改日期', auto_now=True) # 修改時間
    
    USERNAME_FIELD = 'email' #唯一值
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    def get_absolute_url(self):
        return reverse("index", kwargs={"pk": self.pk})

# 使用者札記
class Article(models.Model):
    article_id = models.AutoField(primary_key=True) #文章編號
    article_context = models.TextField('文章內容', max_length=500, null= True, blank=True) #文章內容
    singer_name = models.CharField('歌手名稱', max_length=30) #歌手名稱
    song_name = models.CharField('歌曲名稱', max_length=20) # 歌曲名稱
    link =  models.URLField('歌曲連結',max_length=200) #歌曲連結
    sencla = models.CharField('情感分類',max_length=1) #情感分類
    rectime = models.DateField('新增時間', auto_now_add=True) #創建文章的時間
    email = models.ForeignKey('Acct', related_name='acct_email', on_delete=models.RESTRICT) #使用者編號外鍵，auth是django資料庫的內建資料表名稱(關於user的資料)
    # song_id = models.ForeignKey('Song', related_name='article_song_id', on_delete=models.RESTRICT) #歌曲編號外鍵
    # draft_context = models.TextField('草稿', max_length=500, null= True, blank=True) # 草稿
    # nick_name = models.CharField('暱稱', max_length=20, null=True, blank=True) # 署名(判斷是否匿名)，一般使用使用者名稱
    # sendmail = models.BooleanField('寄信權限', null=True) #設定是否要寄到佈告欄
    # 還要加一欄是否要寄到佈告欄的欄位
    # null 是允許存進資料庫為空值，blank 是允許在後台空著不寫

# 歌手
class Singer(models.Model):
    singer_id = models.AutoField(primary_key=True) #歌手編號
    singer_name = models.CharField('歌手名稱', max_length=30) #歌手名稱

# 歌曲
# class Song(models.Model):
#     song_id = models.AutoField(primary_key=True) #歌曲編號
#     richi = models.DateField('上線日期') # 上線日期
#     song_name = models.CharField('歌曲名稱', max_length=20) # 歌曲名稱
#     link =  models.URLField('歌曲連結',max_length=200) #歌曲連結
#     sentim_class = models.CharField('情感分類',max_length=1) #情感分類(喜、怒、哀、懼、愛、恨)
#     singer_id = models.ForeignKey('Singer',related_name='song_singer_id', on_delete=models.RESTRICT) #歌手編號外鍵
    
#     def __str__(self): # 回傳歌曲名稱
#         return self.song_name
    
    # def get_songlink(self):
    #     return self.link

    
# 留言
# class ArtMessage(models.Model):
#     mess_id = models.AutoField(primary_key=True) #留言編號
#     mess_context = models.TextField('留言內容', max_length=50, null= True, blank=True) # 留言內容
#     mess_date = models.DateField('新增時間', auto_now_add=True) # 留言日期
#     email = models.ForeignKey('Acct', related_name='Art_email', on_delete=models.RESTRICT) # 使用者帳號
#     article_id = models.ForeignKey('Article', related_name='Article_id', on_delete=models.RESTRICT) # 文章編號    