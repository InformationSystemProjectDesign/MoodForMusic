import { useRef, useEffect } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';
import getBaseUrl from "../../pages/api/const";
import { useRouter } from "next/router";
import Script from 'next/script';

// 修改密碼的api
function ChangePasswordForm() {
  // const titleInputRef = useRef();
  // const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if(sessionStorage.getItem('token') == null){
      alert("尚未登入，請先登入");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    // const enteredTitle = titleInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const ChangePasswordData = {
      // title: enteredTitle,
      // email: enteredEmail,
      old_password: enteredPassword,
      new_password: enteredConfirmPassword,
    };

    console.log(ChangePasswordData);

    fetch(getBaseUrl + "change-password/", {
      method: "PATCH",
      body: JSON.stringify(ChangePasswordData) /*把json資料字串化*/,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"), //登入才可以使用的頁面功能，權限儲存token
      }),
    })
      .then((res) => {
        console.log("res", res);
        if (res.ok) {
          return res.json();
        } else {
          throw "修改失敗";
        }
      })
      .then((data) => {
        /*接到request data後要做的事情*/
        // sessionStorage.setItem("token", data.token);  //儲存token
        sessionStorage.clear();
        alert('修改成功，請重新登入')
        router.push('/')  //跳轉頁面
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log("ee", e);
        alert('修改失敗，目前密碼輸入錯誤請重新輸入') //系統頁面提示訊息登入失敗
      });
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <script src="https://accounts.google.com/gsi/client" async />
      <script src="https://apis.google.com/js/api.js" async />
      <Head>
        <title>修改密碼</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 修改密碼表單 */}
      <div className="flex items-center justify-center p-12 pt-0">
        <div className="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <label
              htmlFor="name"
              className="mb-3 block text-center text-3xl font-bold"
            >
              修改密碼
            </label>

            {/* 帳號 */}
            {/* <div class="mb-5">              
              <input
                type="email"
                name="email"
                id="email"
                placeholder="帳號（請輸入電子郵件）"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div> */}

            {/* 舊密碼 */}
            <div className="mb-5">              
              <input
                type="password"
                name="password"
                id="password"
                placeholder="請輸入目前的密碼"
                ref = {passwordInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 新密碼 */}
            <div className="mb-5">              
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="輸入新的密碼"
                ref = {confirmPasswordInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 儲存修改button */}
            <div className="mb-5">
                <button 
                onClick={submitHandler}
                className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                >
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