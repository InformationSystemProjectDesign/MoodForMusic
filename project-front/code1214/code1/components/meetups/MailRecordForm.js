import { useEffect, useState } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import Link from 'next/link';
import getBaseUrl from "../../pages/api/const";
import { useRouter } from "next/router";

{/* # TODO: 信件紀錄的API，要用useState去渲染顯示 */ }
// 信件紀錄的api
function MailRecordForm() {
  // var songURL_d = "";
  // var artURL_d = "";
  // var time_d = "";
  // var art_mood_d = "";
  const router = useRouter();
  const [artLists, setArtLists] = useState([]) // [] {}
  useEffect(() => { MyArticleHandler() }, [])

  useEffect(() => {
    if (sessionStorage.getItem('token') == null) {
      alert("尚未登入，請先登入");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function MyArticleHandler() {
    $('#loading_icon').show();
    $('#hint_message').show();
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
        setArtLists(result);
        $('#loading_icon').hide();
        $('#hint_message').hide();
        // console.log("------artlist----");
        // console.log(artLists);
        // console.log("------artlist----");


        // result.forEach(function(content){
        //   // console.log(content);
        //   console.log("歌曲連結:",content['link']);
        //   console.log("文章連結:",content['article_link']);
        //   console.log("文章時間:",content['rectime']);
        //   console.log("文章情緒:",content['sencla']);

        // songURL_d = content['link'];
        // artURL_d = content['article_link'];
        // time_d = content['rectime'];
        // art_mood_d = content['sencla'];

        // document.getElementById("songURL_a").innerHTML = "歌曲連結: " + songURL_d;
        // document.getElementById("songURL_a").href = songURL_d; 
        // document.getElementById("artURL_a").innerHTML = "文章連結: " + artURL_d;
        // document.getElementById("artURL_a").href = artURL_d;
        // document.getElementById("time_d").innerHTML = "建立日期: " + time_d;
        // document.getElementById("art_mood_d").innerHTML= "文章情緒:" + art_mood_d;
        // });
        // console.log('artLists:',artLists)
      });
  }

  if (artLists == null) {
    alert("請先登入");
    router.push('/');
  } else {
    return (
      <Fragment>
        {/* link */}
        {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
        <Head>
          <base target='_blank'></base>
          <title>信件紀錄</title>
          <meta
            name="description"
            content="Browse a huge list of active React meetups!"
          />
          <>
            <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.js" async defer />
            <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.min.js" async defer />
            <script src="https://apis.google.com/js/api:client.js" async defer />
            <script src="https://accounts.google.com/gsi/client" async defer />
          </>

        </Head>

        {/* 文章送出表單 */}

        <div className="flex items-center justify-center p-12 pt-0">
          <div className="mx-auto w-full max-w-[550px]">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
              <label
                htmlFor="name"
                className="mb-3 block text-left text-1xl font-bold"
              >
                個人天地 - 信件紀錄
              </label>

              {/* loading icon */}
              <div className="spinner-border text-secondary" role="status" id="loading_icon" style={{ display: 'none' }}>
                <span className="sr-only">Loading...</span>
              </div>
              <span id="hint_message" style={{ display: 'none' }}>系統正在為您載入信件，請耐心等待 謝謝您</span>

              {artLists.map(data => (
                <><div className="w-full rounded-md border-[#000000] border-[3px] p-3 mb-3 text-base outline-none focus:border-gray-800  focus:shadow-md">
                  {/* 歌曲連結 */}
                  <div className="mt-5 mb-5">
                    {/* <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"></button> */}
                    <a className="break-all max-w-full text-center inline-flex justify-center p-3 rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 text-base hover:bg-gray-100 focus:outline-none"
                      id="songURL_a" href={data.link} target="_blank" rel="noreferrer noopenner" style={{ textDecoration: 'none' }}>
                      歌曲連結: {data.link}
                    </a>
                  </div>

                  {/* 文章連結 */}
                  <div className="mb-5">
                    {/* <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"></button>  */}
                    <a className="break-all max-w-full text-center inline-flex justify-center p-3 rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800  text-base hover:bg-gray-100 focus:outline-none"
                      id="artURL_a" href={data.article_link} target="_blank" rel="noreferrer noopenner" style={{ textDecoration: 'none' }}>
                      文章連結: {data.article_link}
                    </a>
                  </div>

                  <div className="flex flex-row place-content-center">

                    {/* 時間 */}
                    <div className="mb-5 mr-3">
                      <button
                        className="cursor-text w-full rounded-md bg-white  border transition duration-150 p-3 ease-in-out focus:outline-none text-base"
                        id="time_d"
                      >
                        文章時間: {data.rectime}
                      </button>
                    </div>

                    {/* 心情 */}
                    <div className="mb-5">
                      <button
                        className="cursor-text w-full rounded-md bg-white  border transition duration-150 p-3 ease-in-out focus:outline-none text-base"
                        id="art_mood_d"
                      >
                        文章情緒: {data.sencla}
                      </button>
                    </div>
                  </div>
                </div></>
              ))}
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MailRecordForm;