import json
from django.forms import PasswordInput
from django.shortcuts import redirect, render
from django.contrib import auth, messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, JsonResponse
from django.db import models
from musicApp import models
# from django.contrib.auth.models import User

# d_mailsave_id = 0 #草稿文章編號，全域變數可能要改其他方法，因為如果多人使用此網頁會重疊儲存(改用session)

def index(request): #首頁&登出
    if request.user.is_authenticated:
        if request.method == 'POST':
            user_email = request.session.get('user_email')
            del request.session['user_email']
            logout(request)
            messages.info(request,'已登出，謝謝你的使用')
            return HttpResponseRedirect('http://127.0.0.1:8000/acct_login/')
        else:
            if( 'form_message' in request.session ):
                d_message = request.session.get('form_message')
                del request.session['form_message']
                messages.info(request, d_message)
            # return render(request,'Index.html', {'message_disp':message })
            return render(request, 'Index.html')
    else:
        messages.info(request, '尚未登入，請重新登入')
        return HttpResponseRedirect('http://127.0.0.1:8000/acct_login/')
    

def acct_login(request): #登入頁(login在django裡有此函數，改名成acct_login)
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(email=email, password=password)
        if user is not None and user.is_active:
            login(request, user)
            messages.info(request, '登入成功!')
            request.session["user_email"] = email # 建立session
            return HttpResponseRedirect('http://127.0.0.1:8000/index')
        else:
            messages.info(request, '登入失敗，請檢查帳號密碼是否輸入正確!')
            return render(request, 'Login.html')
    else:
        return render(request, 'Login.html')

def mailCon(request, articleid = None): # 公告欄的其中一個信件內容
    pub_article = models.Article.objects.get(article_id = articleid)  #取得文章
    song_link = models.Song.objects.get(song_name = pub_article.song_id) #取得歌曲連結
    # print(song_link.link)
    
    user_message = models.ArtMessage.objects.filter(article_id = articleid)
    
    if request.method == 'POST':  # 留言要超過7字以上(含7字)，日期才會靠最右
        pmessage = request.POST['comment']
        user_email = request.session.get('user_email')
        user_acct = models.Acct.objects.get(email = user_email)
        models.ArtMessage.objects.create(mess_context=pmessage, email=user_acct, article_id=pub_article)
        messages.info(request, '送出成功!')
        return HttpResponseRedirect('http://127.0.0.1:8000/mailCon/'+ str(articleid))
    
    return render(request, 'MailCon.html', locals())

def mailContent(request, articleid = None): # 個人的其中一個信件內容，超過150字以上會跑版
    pub_article = models.Article.objects.get(article_id = articleid)  #取得文章
    song_link = models.Song.objects.get(song_name = pub_article.song_id) #取得歌曲連結
    return render(request, 'MailContent.html', locals())

def pBoard(request): # 公告欄
    article_open = models.Article.objects.filter(draft_context='', sendmail = 'True') #列出草稿內容為空值且公開的資料
    
    if request.method == 'POST': # 在個人信件只能搜尋歌曲
        searchsb = request.POST['searchSong']
        searchsg = models.Song.objects.get(song_name = searchsb) # 歌曲不能重複
        article_open = models.Article.objects.filter(draft_context='', sendmail = 'True', song_id = searchsg.song_id)
    
    return render(request, 'PBoard.html', locals())

def pMailRecord(request, ptype=None): # 信件紀錄
    user_email = request.session.get('user_email')
    article_close = models.Article.objects.filter(draft_context='', sendmail = 'False', email_id = user_email) #列出草稿內容是空值且不公開的資料
    
    # if ptype == 'pNewTOold':
    #     if request.method == 'POST': # 最新到最舊篩選
    #         article_close = models.Article.objects.filter(draft_context='', sendmail = 'False', email_id = user_email).order_by('-rectime')
    #         messages.info(request, '最新到最舊已排序!')
    #         return JsonResponse({'redirect': '/pMailRecord/'})
    
    if request.method == 'POST': # 在個人信件只能搜尋歌曲
        searchsb = request.POST['searchSong']
        searchsg = models.Song.objects.get(song_name = searchsb) # 歌曲不能重複
        article_close = models.Article.objects.filter(draft_context='', sendmail = 'False', email_id = user_email, song_id = searchsg.song_id)
    
    return render(request, 'PMailRecord.html', locals())

def draftRecord(request): # 草稿記錄
    user_email = request.session.get('user_email')
    article_draft = models.Article.objects.filter(article_context='', email_id = user_email) #列出文章內容是空值的資料 
    
    if request.method == 'POST': # 在草稿信件搜尋日期(搜尋格式: 2022-05-31)
        searchid = request.POST['searchID']
        article_draft = models.Article.objects.filter(article_context='', email_id = user_email, rectime = searchid)
    
    return render(request, 'draftRecord.html', locals())

def pMessage(request): # 個人的留言回覆紀錄
    return render(request, 'PMessage.html')

def profile(request, writeid = None): # 個人檔案(修改密碼)
    if request.user.is_authenticated:
        return render(request, 'Profile.html', locals())
    else:
        messages.info(request, '尚未登入，請重新登入')
        return HttpResponseRedirect('http://127.0.0.1:8000/acct_login/')

def pWrite(request): # 個人寫信，將送出「地球上最浪漫的一首歌」
    if request.method == 'POST':   # 送出信件後會顯示在公告欄上
        description = str(request.POST.get('description')) #信件內容
        signature = str(request.POST.get('signature')) #是否匿名
        send_mail = request.POST.get('send_mail') #是否公開寄送
        if send_mail == 'true':
            send_mail = 'True'
        elif send_mail == 'false':
            send_mail = 'False'
        else:
            send_mail = 'False'
        
        # TODO: AI 放歌的位置(未來要做的)
        # FIXME: 有問題要更正的點
        songid = models.Song.objects.get(song_id = 10)
        email = models.Acct.objects.get(email=request.user.email)
        # print("公開")
        models.Article.objects.create(article_context=description, draft_context="", nick_name=signature, sendmail=send_mail, sencla="愛", song_id=songid, email=email)
        messages.info(request, '送出完成!')
        
        print(description)
        print(signature)
        print(send_mail)
        return HttpResponseRedirect('http://127.0.0.1:8000/index/')
    return render(request, 'PWrite.html')

def dWrite(request, articleid = None): #個人草稿的其中一個編輯畫面
    d_article = models.Article.objects.get(article_id = articleid)  #取得文章
    request.session['draft_mailsave_id'] = articleid
    print(request.session['draft_mailsave_id'])
    # global d_mailsave_id #設定草稿編號為全域變數
    # d_mailsave_id = articleid
    print(d_article.nick_name)
    print(d_article.draft_context)
    
    if request.method == 'POST':  # 送出信件後會顯示在公告欄上
        dd_description = str(request.POST.get('d_description')) #信件內容
        dd_signature = str(request.POST.get('d_signature')) #是否匿名
        dd_send_mail = request.POST.get('d_send_mail') #是否公開寄送
        
        end_draftmail_id = request.session['draft_mailsave_id']
        del request.session['draft_mailsave_id'] # 清空 draft_mailsave_id的session 
        
        if dd_send_mail == 'true':
            dd_send_mail = 'True'
        elif dd_send_mail == 'false':
            dd_send_mail = 'False'
        else:
            dd_send_mail = 'False'
            
        # AI 放歌的位置
        songid = models.Song.objects.get(song_id = 10)
        email = models.Acct.objects.get(email=request.user.email)
        # print("公開")
        models.Article.objects.filter(article_id = end_draftmail_id).update(article_context=dd_description, draft_context="", nick_name=dd_signature, sendmail=dd_send_mail, sencla="愛", song_id=songid, email=email)
        # models.Article.objects.create(article_context=dd_description, draft_context="", nick_name=dd_signature, sendmail=dd_send_mail, sencla="愛", song_id=songid, email=email)
        messages.info(request, '送出完成!')
        return HttpResponseRedirect('http://127.0.0.1:8000/index/')
    
    return render(request, 'dWrite.html', locals())

def draftsend(request, mtype = None): #草稿儲存，將送出「地球上最浪漫的一首歌」
    if mtype == 'p_draftmail': #第一次儲存
        if request.method == 'POST':
            data = json.loads(request.body) 
            description = data.get('description') #信件內容
            signature = data.get('signature') #是否匿名
            send_mail = data.get('send_mail') #是否公開寄送
            if send_mail == 'true':
                send_mail = 'True'
            elif send_mail == 'false':
                send_mail = 'False'
            else:
                send_mail = 'False'
            print(description)
            print(signature)
            print(send_mail)
            
            songid = models.Song.objects.get(song_id = 10)
            email = models.Acct.objects.get(email=request.user.email)
            
            models.Article.objects.create(article_context="", draft_context=description, nick_name=signature, sendmail=send_mail, sencla="", song_id=songid, email=email)

            request.session['form_message'] = "已存入草稿!"
            return JsonResponse({'redirect': '/index/'})
    elif mtype == 'd_draftmail': #第二次以上的儲存
        #  global d_mailsave_id
        if request.method == 'POST':
            data = json.loads(request.body) 
            d2_description = data.get('d_description') #信件內容
            d2_signature = data.get('d_signature') #是否匿名
            d2_send_mail = data.get('d_send_mail') #是否公開寄送
            if d2_send_mail == 'true':
                d2_send_mail = 'True'
            elif d2_send_mail == 'false':
                d2_send_mail = 'False'
            else:
                d2_send_mail = 'False'
            print(d2_description)
            print(d2_signature)
            print(d2_send_mail)
            
            d2_draftmail_id = request.session['draft_mailsave_id']
            del request.session['draft_mailsave_id'] # 清空 draft_mailsave_id的session 
            # d2_draftmail_id = d_mailsave_id
            # d_mailsave_id = 0
            songid = models.Song.objects.get(song_id = 10)
            email = models.Acct.objects.get(email=request.user.email)
            # draftmail_id = models.Article.objects.get(article_id = int(articleid))
            
            models.Article.objects.filter(article_id = d2_draftmail_id).update(article_context="", draft_context=d2_description, nick_name=d2_signature, sendmail=d2_send_mail, sencla="", song_id=songid, email=email)

            request.session['form_message'] = "已存入草稿!"
            return JsonResponse({'redirect': '/index/'})
        
        

# def resultMsg(request):
#     return render(request, 'ResultMsg.html')

def pFileMood(request): #個人情緒圖
    return render(request, 'PFileMood.html')

def PAllMood(request): #整體情緒圖
    return render(request, 'PAllMood.html')

def pFile(request): # 修改密碼功能
    
    if request.method == 'POST':
        password = request.POST['password']
        new_password = request.POST['newpassword']
        newpassword_check = request.POST['newpassword_check']
        
        getUserEmail = request.session["user_email"] # 可能因為前端欄位是readonly的關係，所以抓不到值，改用session去進行
        
        user = authenticate(username = getUserEmail, password = password)
        if user is not None and user.is_active:
            if new_password == newpassword_check:
                user = models.Acct.objects.get(email=getUserEmail)
                user.set_password(new_password)
                user.save()
                del request.session['user_email']
                messages.info(request,"修改成功，請重新登入")
                return HttpResponseRedirect('http://127.0.0.1:8000/acct_login')
            else:
                messages.info(request, '修改失敗，請確認您輸入的新密碼是否正確')
                return render(request, 'PFile.html')
        else:
            messages.info(request, '修改失敗，請確認您輸入的目前密碼是否正確')
            return render(request, 'PFile.html')
    else:
        return render(request, 'PFile.html')

def signPage(request): #註冊功能
    if request.method == 'POST':
        username = request.POST['user_name']
        email = request.POST['email']
        password = request.POST['password']
        password_che = request.POST['password_check']
        ct_user = models.Acct.objects.filter(email=email).count()
        if password == password_che:
            if ct_user == 0:
                unit = models.Acct.objects.create_user(username=username, email=email, password=password)
                unit.save()
                messages.info(request, '註冊成功!')
                return HttpResponseRedirect('http://127.0.0.1:8000/acct_login')
            else:
                messages.info(request, '帳戶已存在，請使用其他電子信箱')
                return render(request, 'Sign.html')
        else:
            messages.info(request, '密碼輸入有誤，請再重新輸入!')
            return render(request, 'Sign.html')
    else:
        return render(request, 'Sign.html')