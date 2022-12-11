import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';
import getBaseUrl from "../../pages/api/const";
import { useRouter } from "next/router";

// 註冊api
function RegisterForm() {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const router = useRouter();

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
    };

    console.log(registerData);

    if (enteredConfirmPassword == enteredPassword){
      fetch(getBaseUrl + "auth/add-user", {
        method: "POST",
        body: JSON.stringify(registerData) /*把json資料字串化*/,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
        .then((res) => {
          console.log("res", res);
          if (res.ok) {
            return res.json();
          } else {
            if(!enteredusername || !enteredEmail || !enteredPassword || !enteredConfirmPassword){
              throw "少填欄位";
            }else{
              throw "註冊失敗";
            }
          }
        })
        .then((data) => {
          /*接到request data後要做的事情*/
          console.log("data", data);
          if (data["message"] == "帳戶已存在，請使用其他電子信箱"){
            alert('帳戶已存在，請使用其他電子信箱')
            router.reload(); // 重整頁面
          }else{
            alert('註冊成功')
            router.push('/')  //跳轉頁面
          }
          
        })
        .catch((e) => {
          /*發生錯誤時要做的事情*/
          console.log("ee", e);
          if(e == "少填欄位"){
            alert("少填欄位，註冊失敗")
          }else{
            alert('註冊失敗，可能帳號已被使用') //系統頁面提示訊息登入失敗
            router.reload(); // 重整頁面
          }
        });
    }else{
      alert('確認密碼輸入錯誤，請重新輸入')
      router.reload(); // 重整頁面
    }
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      {/* <script src="https://accounts.google.com/gsi/client" async/>
      <script src="https://apis.google.com/js/api.js" async /> */}
      <Head>
        <title>註冊</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 註冊表單 */}
      <div className="flex items-center justify-center p-12 pt-0">
        <div className="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <label
              htmlFor="name"
              className="mb-3 block text-center text-3xl font-bold"
            >
              註冊
            </label>
            <div className="w-full rounded-md py-3 px-6 text-base outline-none focus:border-gray-800  focus:shadow-md">
            {/* 使用者名稱 */}
            <div className="mb-5">              
              <input
                type="text"
                name="name"
                id="name"
                placeholder="使用者名稱"
                ref = {usernameInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
              />
            </div>

            {/* 帳號 */}
            <div className="mb-5">              
              <input
                type="email"
                name="email"
                id="email"
                placeholder="帳號（請輸入電子郵件）"
                ref = {emailInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 密碼 */}
            <div className="mb-5">              
              <input
                type="password"
                name="password"
                id="password"
                placeholder="密碼"
                ref = {passwordInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 確認密碼 */}
            <div className="mb-5">              
              <input
                type="password"
                name="password"
                id="password"
                placeholder="確認密碼"
                ref = {confirmPasswordInputRef}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 註冊btn */}
            <div className="mb-5">
                <button 
                onClick={submitHandler}
                className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                >
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