import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';

// 信件紀錄的api
function MailRecordForm() {
  const URLInputRef = useRef();
  

  function submitHandler(event) {
    event.preventDefault();

    const enteredURL = URLInputRef.current.value;

    const articleData = {
      URL: enteredURL
    };

    console.log(articleData);
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
                        <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                            歌曲連結
                        </button>
                    </div>

                    {/* 文章連結 */}
                    <div class="mb-5">
                        <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                            文章連結
                        </button>
                    </div>
                    
                    <div class="flex flex-row place-content-center">

                      {/* 時間 */}
                      <div class="mb-5">
                          <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                              時間
                          </button>
                      </div>

                      {/* 心情 */}
                      <div class="mb-5">
                          <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                              心情
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