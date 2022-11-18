from sklearn.feature_extraction.text import TfidfVectorizer
import urllib.request as req
import numpy as np
from scipy.linalg import norm
import pandas as pd
import bs4, requests

# 載入 Selenium 相關模組
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

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
    stopwords = stopwordslist('./musicApp/song_crawler/stopword.txt')  # 這裏加載停用詞的路徑
    outstr = ''
    for word in sentence:           
        if word not in stopwords:  
            if word != '\t'and'\n':
                outstr += word
    return outstr

# ppt和dcard的判斷
def dcardCraw(url):
    # 設定Chrome Driver 的執行檔路徑
    options = Options()
    options.add_argument("--incognito") # 啟動進入無痕模式
    options.add_argument("--window-size=1,1") # 頁面長度寬度調整
    # chrome_options.add_argument('--headless')  # 啟動Headless 無頭(隱藏瀏覽器)

    # 隱藏"Chrome正在受到自動軟體的控制"
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    options.add_argument('--disable-gpu') #關閉GPU 避免某些系統或是網頁出錯
    options.add_argument('--hide-scrollbars') # 隱藏滾動條, 應對一些特殊頁面
    options.chrome_executable_path = "./musicApp/song_crawler/chromedriver.exe"
    # ./musicApp/song_crawler/chromedriver.exe
    # C:\\Users\\student\\Desktop\\djangoweb_111202\\code\\MusicMain\\musicApp\\song_crawler\\chromedriver.exe
    # C:/Users/student/Desktop/djangoweb_111202/code/MusicMain/musicApp/song_crawler/chromedriver.exe
    
    #建立 Driver 物件實體，用程式操作瀏覽器運作
    driver = webdriver.Chrome(options = options)
    driver.minimize_window() #視窗縮小化
    driver.get(url)
    data = driver.page_source #取得網頁的原始碼
    
    # 讓beautifulSoup協助我們解析HTML格式文件
    root = bs4.BeautifulSoup(data, "html.parser")
    # dcard標籤會不定時更換須注意，用列表顯示全部爬蟲下來的標題
    titles = root.find("div", class_ = "sc-bbb1500f-0 dzKBPw")
    
    result = ""
    for title in titles:
        result += title.text.strip().replace('\n', '').replace(' ', '')
    # print('result: ',result) #印出內文
    
    driver.close()
    return result

def pttCraw(url):
    #建立一個Request 物件，附加Request Headers 的資訊
    request = req.Request(url, headers={
        "cookie":"over18=1",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
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
    # print(main_content)
    
    return main_content

class YoutubeSpider():
    def __init__(self, api_key):
        self.base_url = "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=1"
        self.api_key = api_key

    def get_html_to_json(self, path):
        """組合 URL 後 GET 網頁並轉換成 JSON"""
        api_url = f"{self.base_url}&key={self.api_key}{path}"
        r = requests.get(api_url)
        if r.status_code == requests.codes.ok:
            data = r.json()
        else:
            data = None
        return data
    
    def get_ytSearch(self, theKey):
        path = f'&q={theKey}'
        data = self.get_html_to_json(path)
        
        try:
            uploads_id = data['items'][0]['id']['videoId']
            # uploads_id = data #輸出是dict
        except KeyError:
            uploads_id = None
        return uploads_id
    
YOUTUBE_API_KEY = "AIzaSyBKdJO0Q7tS8jQyuZUx0kNmgFD2L73Bn1E"
youtube_spider = YoutubeSpider(YOUTUBE_API_KEY)

def find_song(url):
    res_dict = {} # 建立空字典
    train=pd.read_csv('./musicApp/song_crawler/done_2021-08to12.csv') # 歌曲資料
    
    if url[12:15] == "dca":
        article = dcardCraw(url)
    else:
        article = pttCraw(url)
    
    # print("article: ",article)
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
        
    author = train.singer.iloc[num]
    songName = train.name.iloc[num]
    youtube_theKey = author + ' ' + songName  # 孫凱旋 專屬
    uploads_id = youtube_spider.get_ytSearch(youtube_theKey)   
    
    print("文章內容:", article)
    print('配適度:',highpri,'歌手:',train.singer.iloc[num],'歌名:',train.name.iloc[num], '情緒:',train.moodCat.iloc[num])
    print("連結:https://www.youtube.com/watch?v="+uploads_id)
    
    res_dict['article'] = article
    res_dict['highpri'] = highpri
    res_dict['singer'] = train.singer.iloc[num]
    res_dict['song'] = train.name.iloc[num]
    res_dict['art_mood'] = train.moodCat.iloc[num]
    res_dict['songURL'] = "https://www.youtube.com/watch?v="+uploads_id
    
    return res_dict


# find_song('https://www.dcard.tw/f/relationship/p/238632575')
# find_song('https://www.dcard.tw/f/talk/p/239984330')
# find_song('https://www.dcard.tw/f/photography/p/240167044')
# find_song("http://www.ptt.cc/bbs/Boy-Girl/M.1664277279.A.9AA.html")
# find_song("https://www.ptt.cc/bbs/Gossiping/M.1664530650.A.4E3.html")
# find_song("http://www.ptt.cc/bbs/Boy-Girl/M.1660356781.A.365.html")

# 需pip install
# pip install requests
# pip install beautifulSoup4
# pip install selenium