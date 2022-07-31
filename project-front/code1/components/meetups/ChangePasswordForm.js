import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';

function ChangePasswordForm() {
  const titleInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const registerData = {
      title: enteredTitle,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    console.log(ChangePasswordData);
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>修改密碼</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 修改密碼表單 */}
      <div class="flex items-center justify-center p-12 pt-0">
        <div class="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <label
              for="name"
              class="mb-3 block text-center text-3xl font-bold"
            >
              修改密碼
            </label>

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
                type="confirmPassword"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="確認密碼"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 儲存修改button */}
            <div class="mb-5">
                <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                    儲存修改
                </button>
            </div>

          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ChangePasswordForm; 