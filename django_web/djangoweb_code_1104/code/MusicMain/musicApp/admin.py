from django.contrib import admin
from .models import Article, Acct

# Register your models here.
class AcctAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'password', 'date_joined','update_time', 'is_superuser', 'is_staff', 'is_active']
    search_fields = ['email', 'username', 'date_joined']
    
    fieldsets = (
        ('基本資料', {'fields': ('email', 'password', 'username')}),
        ('權限管理', {'fields': ('is_active', 'is_staff', 'groups')}),
    )
    
    add_fieldsets = (
        ('基本資料', {'fields': ('email', 'username', 'password1', 'password2')}),
        ('權限管理', {'fields': ('is_active', 'is_staff')}), 
    )

admin.site.register(Acct, AcctAdmin)


class ArticleAdmin(admin.ModelAdmin):
    list_display = ['article_id', 'article_context', 'singer_name', 'song_name', 'link', 'sencla', 'rectime', 'email']
    search_fields = ['sencla', 'rectime'] # 搜尋署名、情感分類、文章送出日期
    ordering = ['article_id'] # 升冪排序
    
    fieldsets = (
        ('文章資料', {'fields': ('article_context', 'sencla', 'email')}),
        ('歌曲推薦', {'fields': ('singer_name', 'song_name', 'link')}),
    )
    
    add_fieldsets = (
        ('文章資料', {'fields': ('article_context', 'sencla', 'email')}),
        ('歌曲推薦', {'fields': ('singer_name', 'song_name', 'link')}),
    )
    
admin.site.register(Article, ArticleAdmin)


# class SingerAdmin(admin.ModelAdmin):
#     list_display = ['singer_id', 'singer_name']
#     search_fields = ['singer_name'] #搜尋歌手名稱
#     ordering = ['singer_id'] # 升冪排序

# admin.site.register(Singer, SingerAdmin)

# class SongAdmin(admin.ModelAdmin):
#     list_display = ['song_id', 'song_name', 'link', 'richi', 'sentim_class', 'singer_id']
#     search_fields = ['song_name', 'sentim_class'] #搜尋歌名、情感分類
#     ordering = ['song_id'] # 升冪排序

# admin.site.register(Song, SongAdmin)

# class ArtMessageAdmin(admin.ModelAdmin):
#     list_display = ['mess_id', 'mess_context', 'mess_date', 'email', 'article_id']
#     search_fields = ['mess_date', 'email', 'article_id']
#     ordering = ['mess_id']

# admin.site.register(ArtMessage, ArtMessageAdmin)

    


admin.site.site_header = '知音'
admin.site.site_title = '登錄系統後臺'
admin.site.index_title = '管理者後臺'