# 此例子為「抓取」dcard的感情版原始碼(HTML)
# urls是放置要爬蟲的網址，要一次放20幾、30幾都行
import urllib.request as req
urls = [
    "https://www.dcard.tw/f/relationship/p/226301846",
    ]
# "https://www.dcard.tw/f/relationship/p/186420174"

def getWord(url):
    #建立一個Request 物件，附加Request Headers 的資訊
    request = req.Request(url, headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8")

    # print(data)
    #「解析」原始碼，取得每篇文章的問題
    # utf-8(比較省空間)有部分的漢字不能轉換所以要用GB18030編碼

    import bs4
    root = bs4.BeautifulSoup(data, "html.parser") # 讓beautifulSoup協助我們解析HTML格式文件
    titles = root.find("div", class_ = "phqjxq-0 iJJmxb") # 用列表顯示全部爬蟲下來的標題

    for title in titles:
        result = title.text.strip().replace('\n', '').replace(' ', '')
        print(result)
        with open("dcard_couple1.txt", mode="a", encoding="utf-8") as file:
            file.write(result + '\n')
            file.write('\n' + "-------------" + '\n')

    # with open("dcard_couple.txt", mode="a", encoding="utf-8") as file，dcard_couple是存放文章的檔案，此檔案會跟這個py檔放在同一層，也就是在同個資料夾中
    # titles代表div標籤
    # 尋找class = "title" 的div 標籤，因為class是保留字，所以寫成class_
    # root 代表整個網頁、title是網頁標籤也是網頁標題
    # cls 是清空終端機(terminal)
    # mode = "a"是以附加的方式打開並寫入文件，因為mode = "w"會將檔案清空在寫入，mode="a"不會清空

cnt = 1
for url in urls:
    getWord(url)
    cnt += 1

# 若要執行此檔在終端機寫「python dcard_continuous.py」