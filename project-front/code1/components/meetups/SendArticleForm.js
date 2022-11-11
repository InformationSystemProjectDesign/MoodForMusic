import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';

function ArticleForm() {
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
        <title>送出文章</title>
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
                    個人天地 - 寫信
                    </label>
                    <div class="w-full rounded-md border-[#000000] border-[3px] py-3 px-6 text-base outline-none focus:border-gray-800  focus:shadow-md">
                    {/* 文章連結 */}
                     <div class="mb-5">              
                        <input
                            type="text"
                            name="url"
                            id="url"
                            placeholder="文章連結"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
                        />
                    </div>
            
                    {/* dcard文章送出btn */}
                    <div class="mb-5">
                        <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                            Dcard連結送出
                        </button>
                    </div>
                    {/* ptt文章送出btn */}
                    <div class="mb-5">
                        <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                            PTT連結送出
                        </button>
                    </div>

                    <label
                        for="name"
                        class="mb-3 block text-center text-base font-bold">
                        <p>22/05/29更新我發文的隔天我就提分手了喔，分手的隔天對方就說很後悔之類的哈哈哈總之，我現在很開心～～我看也有蠻多人收藏這篇文章的，就不刪除了底下的留言都很溫暖，一樣處境的你都可以看看！我想跟你們說：「你永遠值得被愛」迷茫沒關係、不敢放手也沒關係，因為總會過去的。都會好的。希望大家的愛情都能順利！以下正文22/04/16前幾天原本還好好的我們，你突然對我說：「我想了很久，我喜歡你，但我…其實沒有那麼喜歡你。」我們確實沒有交往很久，但從我喜歡你以來我一直都真心付出，而我好喜歡你。在別人的眼中，有些人覺得你的條件不夠好，可我從不這麼認為，也從沒因此減少我對你的愛意……我不知道該回答什麼。「那…你是要我們分手嗎？」你沈默了。「我只是想告訴你，我發覺我好像還沒準備好，這樣對你來說不公平。但你現在知道了，你可以選擇分手，或者我們繼續交往，等待我。」我知道你被前任傷害過，可如今的你卻是傷害我的那個。「你還喜歡我嗎？」「喜歡，只是沒有妳那麼喜歡我。」「你想分手嗎？」「我…不知道。我真的不知道，每當你對我好，我會覺得對不起你，因為我還沒辦法給你我的全心。如果你不能接受，那我們就分手，如果你願意等我，我們就像往常一樣」我哭了，而你也哭了。我們討論著我們的關係好幾天。直到最近，我問你，你想分手嗎？你說：「我想跟以前一樣…只是…我現在真的還沒辦法給你我全部的愛意，但我會努力。你呢？」我也不知道。如果現在沒那麼喜歡，那以後會嗎？我們有辦法像往常一樣嗎？如果你狠下心告訴我你不喜歡我，我願意直接離開。可你的選擇卻是希望我留下，我猶豫了。</p>
                    </label>

                    <label
                        for="name"
                        class="mb-3 block text-center text-base font-bold">
                        <p>美好 - 陳布朗</p>
                        <a href="https://www.youtube.com/watch?v=e0FXJGt7ZY4">https://www.youtube.com/watch?v=e0FXJGt7ZY4</a>                        
                    </label>
                    </div>
                </form>
                
            </div>
        </div>
      
    </Fragment>
  );
}

export default ArticleForm;