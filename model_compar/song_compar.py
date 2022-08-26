from sklearn.feature_extraction.text import TfidfVectorizer
import urllib.request as req
import numpy as np
from scipy.linalg import norm
import pandas as pd
import bs4

def tfidf_similarity(s1, s2):
    def add_space(s):
        return ' '.join(list(s))
    # 將字中間加入空格
    s1, s2 = add_space(s1), add_space(s2)
    # 轉化為TF矩陣
    cv = TfidfVectorizer(tokenizer=lambda s: s.split())
    corpus = [s1, s2]
    vectors = cv.fit_transform(corpus).toarray()
    # 計算TF係數
    return np.dot(vectors[0], vectors[1]) / (norm(vectors[0]) * norm(vectors[1]))

def stopwordslist(filepath):
    stopwords = [line.strip() for line in open(filepath, 'r', encoding='utf-8').readlines()]
    return stopwords

def movestopwords(sentence):
    stopwords = stopwordslist('stopword.txt')  # 這裏加載停用詞的路徑
    outstr = ''
    for word in sentence:           
        if word not in stopwords:  
            if word != '\t'and'\n':
                outstr += word
    return outstr

# ppt和dcard的判斷
def dcardCraw(url):
    #建立一個Request 物件，附加Request Headers 的資訊
    request = req.Request(url, headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")

    # print(data)
    #「解析」原始碼，取得每篇文章的問題
    # utf-8(比較省空間)有部分的漢字不能轉換所以要用GB18030編碼

    root = bs4.BeautifulSoup(data, "html.parser") # 讓beautifulSoup協助我們解析HTML格式文件
    titles = root.find("div", class_ = "sc-ba53eaa8-0 iSPQdL") # 用列表顯示全部爬蟲下來的標題
    # print(titles)
    
    for title in titles:
        result = title.text.strip().replace('\n', '').replace(' ', '')
        print(result)
    
    return result

def pttCraw(url):
    #建立一個Request 物件，附加Request Headers 的資訊
    request = req.Request(url, headers={
        "cookie":"over18=1",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")

    # print(data)
    #「解析」原始碼，取得每篇文章的問題
    # utf-8(比較省空間)有部分的漢字不能轉換所以要用GB18030編碼

    root = bs4.BeautifulSoup(data, "html.parser") # 讓beautifulSoup協助我們解析HTML格式文件
    titles = root.find("div", class_ = "bbs-screen bbs-content").text # 用爬蟲抓內文
    
    #去除掉 target_content
    target_content = '※ 發信站: 批踢踢實業坊(ptt.cc),'
    content = titles.split(target_content)
    
    #去除掉 作者 看板 標題 時間
    results = root.select('span.article-meta-value')

    if len(results)>3:
        #作者 看板 標題 時間
        firstLine = "作者" + results[0].text + "看板" + results[1].text + "標題" + results[2].text + "時間" + results[3].text

    content = content[0].split(firstLine)
    
    #去除掉文末 --
    main_content = content[1].replace('--', '')

    #去除掉換行
    main_content = main_content.replace('\n', '')
    
    #印出內文
    print(main_content)
    
    return main_content


def find_song(url):
    train=pd.read_csv('2021-08to12.csv')
    
    if url[12:15] == "dca":
        article = dcardCraw(url)
    else:
        article = pttCraw(url)
    
    lyrics=train['lyrics']
    i=0
    num=0
    highpri=0
    for text in lyrics:
        text=movestopwords(text)
        text=text.replace(' ','')
        text=text.replace(',','，')
        if tfidf_similarity(text, article)>highpri:
            highpri=tfidf_similarity(text, article)
            num=i
        i+=1
    print('配適度:',highpri,'歌手:',train.singer.iloc[num],'歌名:',train.name.iloc[num])

find_song('https://www.dcard.tw/f/relationship/p/239711333')