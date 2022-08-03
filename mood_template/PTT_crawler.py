# -*- coding: utf-8 -*-

# 導入 模組(module) 
import requests 
# 導入 BeautifulSoup 模組(module)：解析HTML 語法工具
import bs4

# 文章連結
URL = "https://www.ptt.cc/bbs/WomenTalk/M.1601151047.A.F06.html"
# 設定Header與Cookie
my_headers = {'cookie': 'over18=1;'}
# 發送get 請求 到 ptt
response = requests.get(URL, headers = my_headers)


#  把網頁程式碼(HTML) 丟入 bs4模組分析
soup = bs4.BeautifulSoup(response.text,"html.parser")

## PTT 上方4個欄位
header = soup.find_all('span','article-meta-value')

# 作者
author = header[0].text
# 看版
board = header[1].text
# 標題
title = header[2].text
# 日期
date = header[3].text


## 查找所有html 元素 抓出內容
main_container = soup.find(id='main-container')
# 把所有文字都抓出來
all_text = main_container.text
# 把整個內容切割透過 "-- " 切割成2個陣列
pre_text = all_text.split('--')[0]
    
# 把每段文字 根據 '\n' 切開
texts = pre_text.split('\n')
# 如果你爬多篇你會發現 
contents = texts[2:]
# 內容
content = '\n'.join(contents)

# 寫入檔案
#f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/哀/哀.txt","a+")
#f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/喜/喜.txt","a+")
#f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/怒/怒.txt","a+")
f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/懼/懼.txt","a+")
#f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/愛/愛.txt","a+")
#f = open(r"/Users/rogerpei/Desktop/爬蟲/心情文章/恨/恨.txt","a+")

# 顯示內容
# print('作者：'+author, file=f)
# print('看板：'+board, file=f)
# print('標題：'+title, file=f)
# print('日期：'+date, file=f)
print(content, file=f)
print('------------------------', file=f)

# 關閉檔案
f.close()