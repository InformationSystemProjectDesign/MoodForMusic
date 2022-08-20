from sklearn.feature_extraction.text import TfidfVectorizer
import urllib.request as req
import numpy as np
from scipy.linalg import norm
import pandas as pd

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

# TODO
def getWord(url): #dcard抓取，要多加一個ptt抓取
    # 建立一個Request 物件，附加Request Headers 的資訊
    request = req.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")
    # 「解析」原始碼，取得每篇文章的問題
    # utf-8(比較省空間)有部分的漢字不能轉換所以要用GB18030編碼

    import bs4
    # 讓beautifulSoup協助我們解析HTML格式文件
    root = bs4.BeautifulSoup(data, "html.parser")
    titles = root.find("div", class_="sc-8ec6ca7a-0 iuwIaf")  # 用列表顯示全部爬蟲下來的標題

    for title in titles:
        result = title.text.strip().replace('\n', '').replace(' ', '')
    return result
    # titles代表div標籤
    # 尋找class = "title" 的div 標籤，因為class是保留字，所以寫成class_
    # root 代表整個網頁、title是網頁標籤也是網頁標題
    # cls 是清空終端機(terminal)
    # mode = "a"是以附加的方式打開並寫入文件，因為mode = "w"會將檔案清空在寫入，mode="a"不會清空

def find_song(url):
    train=pd.read_csv('2021-08to12.csv')
    article=getWord(url)
    
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
    print('配適度:',highpri,'作者:',train.singer.iloc[num],'歌名:',train.name.iloc[num])

find_song('https://www.dcard.tw/f/relationship/p/239711333')