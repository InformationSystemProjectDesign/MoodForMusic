import { useEffect, useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from 'next/script';

function PersonalForm() {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    /// typeof window !== 'undefined'
    // if(sessionStorage.getItem('key') == "nothing"){
    //   alert("尚未登入，請先登入");
    //   router.push('/');
    // }
    if (sessionStorage.getItem('token') == null) {
      alert("尚未登入，請先登入");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const LoginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(LoginData);
  }

  return (
    <div className="w-full h-full">
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <>
        <script src="https://apis.google.com/js/api:client.js" async defer />
        <script src="https://accounts.google.com/gsi/client" async defer />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous" async />
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous" async />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous" async />
      </>

      <div className="flex flex-col sm:flex-row place-content-center">
        {/* 我的書桌 */}
        <div className="basis-1/2 border-solid border-2 border-black mb-10 sm:mr-10">
          <div className="flex items-center justify-center p-8 sm:p-12 pt-0">
            <div className="mx-auto w-full max-w-[550px]">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <label
                  htmlFor="name"
                  className="my-10 block text-center text-2xl sm:text-3xl font-bold"
                >
                  <p className="underline underline-offset-4 decoration-2">我的書桌</p>
                </label>

                {/* 寫信btn */}
                <div className="mb-3 sm:mb-5">

                  <Link href="personal_space/SendArticle" passHref>

                    <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-sm sm:text-base hover:bg-gray-100 focus:outline-none">
                      寫信
                    </button>
                  </Link>
                </div>

                {/* 信件紀錄btn */}
                <div className="mb-3 sm:mb-5">
                  <Link href="personal_space/MailRecord">
                    <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-sm sm:text-base hover:bg-gray-100 focus:outline-none">
                      信件紀錄
                    </button>
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>

        {/* 個人檔案 */}
        <div className="basis-1/2 border-solid border-2 border-black  mb-10 sm:mr-10">
          <div className="flex items-center justify-center p-8 sm:p-12 pt-0">
            <div className="mx-auto w-full max-w-[550px]">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <label
                  htmlFor="name"
                  className="my-10 block text-center text-2xl sm:text-3xl font-bold ;"
                >
                  <p className="underline underline-offset-4 decoration-2">個人檔案</p>
                </label>

                {/* 修改密碼btn */}
                <div className="mb-3 sm:mb-5">

                  <Link href="personal_space/ChangePassword" passHref>

                    <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800px-6 py-2 text-sm sm:text-base hover:bg-gray-100 focus:outline-none">
                      修改密碼
                    </button>
                  </Link>
                </div>

                {/* 我的情緒圖btn */}
                <div className="mb-3 sm:mb-5">
                  <Link href="personal_space/MyChart" passHref>
                    <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-sm sm:text-base hover:bg-gray-100 focus:outline-none">
                      我的情緒圖
                    </button>
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PersonalForm;
