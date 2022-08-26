import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';

function after_loginForm() {
    return(
        <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>登入後導向頁面</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      <div class="mb-3 block text-center text-3xl font-bold">
            <label>
                  歡迎您使用本系統
            </label>
      </div>
      <div class="mb-5">
            <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                  未來公告欄
            </button>
      </div>
      <div class="mb-5">
            <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                  個人天地
            </button>
      </div>
      <div class="mb-5">
            <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                  整體情緒分佈圓餅圖
            </button>
      </div>
      <div class="mb-5">
            <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                  登出
            </button>
      </div>
     
    </Fragment>
    )
}

export default after_loginForm;