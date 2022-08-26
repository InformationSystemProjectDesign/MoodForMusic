import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

function PersonalForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    <div class="w-full h-full">
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <div class="flex flex-row place-content-center">

        {/* 我的書桌 */}
        <div class="basis-1/2 border-solid border-2 border-black mr-10">
          <div class="flex items-center justify-center p-12 pt-0">
            <div class="mx-auto w-full max-w-[550px]">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <label
                  for="name"
                  class="my-10 block text-center text-3xl font-bold"
                >
                  <p class="underline underline-offset-4 decoration-2">我的書桌</p>
                </label>
              
                {/* 寫信btn */}
                <div class="mb-5">
                  <Link href="sign/after_login" passHref>
                    <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                      寫信
                    </button>
                  </Link>
                </div>

                {/* 信件紀錄btn */}
                <div class="mb-5">
                  <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                    信件紀錄
                  </button>
                </div>
              
              </form>
            </div>
          </div>
        </div>

        {/* 個人檔案 */}
        <div class="basis-1/2 border-solid border-2 border-black  ml-10">
          <div class="flex items-center justify-center p-12 pt-0">
            <div class="mx-auto w-full max-w-[550px]">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <label
                  for="name"
                  class="my-10 block text-center text-3xl font-bold ;"
                >
                  <p class="underline underline-offset-4 decoration-2">個人檔案</p>
                </label>            

                {/* 修改帳密btn */}
                <div class="mb-5">
                  <Link href="sign/after_login" passHref>
                    <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                      修改帳密
                    </button>
                  </Link>
                </div>

                {/* 我的情緒圖btn */}
                <div class="mb-5">
                  <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                    我的情緒圖
                  </button>
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
