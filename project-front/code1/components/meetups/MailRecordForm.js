import { useEffect, useState } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';
import getBaseUrl from "../../pages/const";

{/* # TODO: 信件紀錄的API，要用useState去渲染顯示 */}
// 信件紀錄的api
function MailRecordForm() { 
  var songURL_d = "";
  var artURL_d = "";
  var time_d = "";
  var art_mood_d = "";
  useEffect(() => {MyArticleHandler()}, []) 

  function MyArticleHandler() {
    fetch(getBaseUrl + "article/my_article", {
      method: "GET",
      // body: JSON.stringify(enteredMyChardata),  //GET不用body
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.ok) {
          return res.json(); //將收到的值改為json格式
        } else {
          console.log("get api error");
        }
      })
      .then((result) => {
        // console.log(result);
        // console.log(result[0]['song_name']);

        result.forEach(function(content){
          // console.log(content);
          console.log("歌曲連結:",content['link']);
          console.log("文章連結:",content['article_link']);
          console.log("文章時間:",content['rectime']);
          console.log("文章情緒:",content['sencla']);
          
          songURL_d = content['link'];
          artURL_d = content['article_link'];
          time_d = content['rectime'];
          art_mood_d = content['sencla'];

          document.getElementById("songURL_d").innerHTML = "歌曲連結: " + songURL_d;
          document.getElementById("songURL_d").href = songURL_d; 
          document.getElementById("artURL_d").innerHTML = "文章連結: " + artURL_d;
          document.getElementById("artURL_d").href = artURL_d;
          document.getElementById("time_d").innerHTML = "建立日期: " + time_d;
          document.getElementById("art_mood_d").innerHTML= "文章情緒:" + art_mood_d;
        });

      });
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>信件紀錄</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 文章送出表單 */}
      
        <div class="flex items-center justify-center p-12 pt-0">
            <div class="mx-auto w-full max-w-[550px]">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <label
                        for="name"
                        class="mb-3 block text-left text-1xl font-bold"
                    >
                    個人天地 - 信件紀錄
                    </label>                    
                    <div class="w-full rounded-md border-[#000000] border-[3px] py-3 px-6 text-base outline-none focus:border-gray-800  focus:shadow-md">
                      
                    {/* 歌曲連結 */}
                    <div class="mb-5">
                        <button 
                          class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                          id = "songURL_d"
                        >
                        </button>
                    </div>

                    {/* 文章連結 */}
                    <div class="mb-5">
                        <button 
                          class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                          id = "artURL_d"
                        >
                        </button>
                    </div>
                    
                    <div class="flex flex-row place-content-center">

                      {/* 時間 */}
                      <div class="mb-5">
                        <button 
                          class="cursor-text w-full rounded-md bg-white  border transition duration-150 ease-in-out focus:outline-none px-6 py-2 text-base"
                          id = "time_d"
                        >
                        </button>
                      </div>

                      {/* 心情 */}
                      <div class="mb-5">
                        <button 
                          class="cursor-text w-full rounded-md bg-white  border transition duration-150 ease-in-out focus:outline-none px-6 py-2 text-base"
                          id = "art_mood_d"
                        >
                        </button>
                      </div>

                    </div>
            
                    </div>
                </form>
                
            </div>
        </div>
      
    </Fragment>
  );
}

export default MailRecordForm;