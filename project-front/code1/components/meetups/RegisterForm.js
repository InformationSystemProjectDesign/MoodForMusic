import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';
import getBaseUrl from "../../pages/const";

function RegisterForm() {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  function submitHandler(event) {//按下登入鍵的function
    event.preventDefault();

    const enteredusername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const registerData = {
      username: enteredusername,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    console.log(registerData);
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>註冊</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 註冊表單 */}
      <div class="flex items-center justify-center p-12 pt-0">
        <div class="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <label
              for="name"
              class="mb-3 block text-center text-3xl font-bold"
            >
              註冊
            </label>
            <div class="w-full rounded-md py-3 px-6 text-base outline-none focus:border-gray-800  focus:shadow-md">
            {/* 使用者名稱 */}
            <div class="mb-5">              
              <input
                type="text"
                name="name"
                id="name"
                placeholder="使用者名稱"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
              />
            </div>

            {/* 帳號 */}
            <div class="mb-5">              
              <input
                type="email"
                name="email"
                id="email"
                placeholder="帳號（請輸入電子郵件）"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 密碼 */}
            <div class="mb-5">              
              <input
                type="password"
                name="password"
                id="password"
                placeholder="密碼"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 確認密碼 */}
            <div class="mb-5">              
              <input
                type="password"
                name="password"
                id="password"
                placeholder="確認密碼"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 註冊btn */}
            <div class="mb-5">
                <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                  註冊
                </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default RegisterForm; 