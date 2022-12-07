import { useEffect, useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import getBaseUrl from "../../pages/const";
import { useRouter } from "next/router";
import Script from 'next/script'

// 一般登入api
function IndexForm() {
  // const google = window.google;
  const emailInputRef = useRef(); //和email的input綁起來
  const passwordInputRef = useRef(); //和password的input綁起來

  const router = useRouter();

  // useEffect(() => {
  //   if(sessionStorage.getItem('key') == null){
  //     sessionStorage.setItem("key",'nothing');
  //   }
  // }, [])

  // const {OAuth2Client} = require('google-auth-library');
  // const client = new OAuth2Client(CLIENT_ID);

  function submitHandler(event) {
    //按下登入鍵的function
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    

    const LoginData = {
      email: enteredEmail, //這裡的變數名稱必須跟後端寫的名稱一樣
      password: enteredPassword,
    };

    // console.log(LoginData);
    // console.log("post url", getBaseUrl + "auth/login");

    fetch(getBaseUrl + "auth/login", {
      method: "POST",
      body: JSON.stringify(LoginData) /*把json資料字串化*/,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Authorization": 'Bearer' + sessionStorage.getItem('token')
      }),
    })
      .then((res) => {
        console.log("res", res);
        if (res.ok) {
          return res.json();
        } else {
          throw "登入失敗";
        }
      })
      .then((data) => {
        /*接到request data後要做的事情*/
        // console.log("data", data);
        if (data["result"] == "沒有此使用者，請去註冊"){
          alert('登入失敗 沒有此使用者，請去註冊')
          router.push('/register')
        }else if(sessionStorage.getItem("token") != null){
          alert('你已登入過，無須再次登入')
          router.push('/personal_space')
        }else if(data["result"] == "login fail"){
          alert('帳號或是密碼輸入錯誤')
        }else{
          sessionStorage.setItem("token", data.token);  //儲存token
          router.push('/personal_space')  //跳轉頁面
          alert('登入成功')
        }
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log("ee", e);
        alert('登入失敗') //系統頁面提示訊息登入失敗
      });
  }

  // google 登入
  function submitHandler_google(event) {

    event.preventDefault();
    // google.accounts.id.prompt();

    return
    // fetch(getBaseUrl + "auth/google_login", {
    //   method: "POST",
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"), //登入才可以使用的頁面功能，權限儲存token
    //   }),
    // })
    // .then((res) => {
    //   console.log("res", res);
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     throw "登入失敗";
    //   }
    // })
    // .then((data) => {
    //   /*接到request data後要做的事情*/
    //   sessionStorage.setItem("token", data.token);  //儲存token
    //   router.push('/personal_space')  //跳轉頁面
    // })
    // .catch((e) => {
    //   /*發生錯誤時要做的事情*/
    //   console.log("ee", e);
    //   alert('登入失敗') //系統頁面提示訊息登入失敗
    // });
  }

  function handleCallbackResponse(response) {
    // 只能用資料庫裡原本有的帳戶去登入google，帳號要跟google一樣
    const gt = response.credential;

    const GoogleData = {
      googleToken: gt
    }

    console.log("Encoded JWT ID token:" + response.credential);
    // console.log("response", response)
    fetch(getBaseUrl + "auth/google_login",{
      method:"POST",
      body:JSON.stringify(GoogleData),
      headers:new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      // body:{"token":"Bearer " + response}
      // body:{"token": response.credential}
    })
    .then((res) => {
      console.log("res", res);
      if (res.ok) {
        return res.json();
      } else {
        throw "登入失敗";
      }
    })
    .then((data) => {
      /*接到request data後要做的事情*/
      // if (sessionStorage.getItem("token") != null){
      //   alert('你已登入過，無須再次登入')
      //   router.push('/personal_space')
      // }
      sessionStorage.setItem("token", data.token);  //儲存token
      router.push('/personal_space')  //跳轉頁面
      alert('登入成功')
    })
    .catch((e) => {
      /*發生錯誤時要做的事情*/
      console.log("ee", e);
      alert('登入失敗') //系統頁面提示訊息登入失敗
    });
  }

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id: "510894219524-4tg4ciiubm7got26edpggronmanpfg3p.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        google.accounts.id.prompt()
      }
    });

    // google.accounts.id.renderButton(
    //   document.getElementById("googlebtn"),
    // )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
      <script src="https://apis.google.com/js/api:client.js" async defer /> {/* https://apis.google.com/js/api:client.js https://apis.google.com/js/platform.js*/}
      <script src="https://accounts.google.com/gsi/client" async defer/>
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.js"  async defer/>
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.min.js"  async defer/>
      <Head>
        <title>登入</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
        {/* <meta name="google-signin-client_id" content="510894219524-4tg4ciiubm7got26edpggronmanpfg3p.apps.googleusercontent.com"></meta> */}
        {/* <div class="g_id_signin" data-type="standard"></div> */}
      </Head>

      {/* <>
        <Script src="https://accounts.google.com/gsi/client" async defer />
      </> */}
      <div className="grid grid-cols-2 gap-x-10">
        {/*歡迎文字區*/}
        <div className="grid grid-rows-4  gap-y-4 mt-12">
          <div className="text-6xl">邀請您</div>
          <div className="text-6xl">一起向未來</div>
          <div className="text-6xl">寄封信。</div>
          <div>
            <Link href="">
              <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                onClick={e => {
                  e.preventDefault()

                  if(sessionStorage.getItem("token") == null){
                    alert('尚未登入，不能寫信')
                  }else{
                    router.push("/personal_space/SendArticle");
                  }                  
                }}>
                <a>開始寫信...</a>
              </button>
            </Link>
          </div>
        </div>

        {/* 登入表單 */}
        <div className="grid gap-y-3 mx-auto w-full max-w-[550px]">
          <label htmlFor="name" className="mb-3 block text-center text-3xl font-bold">
            登入
          </label>

          {/* 帳號 */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="帳號（電子郵件）"
              ref={emailInputRef}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
            />
          </div>

          {/* 密碼 */}
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="密碼"
              ref={passwordInputRef}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
            />
          </div>

          {/* 登入btn */}
          <div>
            {/* <Link href="personal_space" passHref>
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                登入
              </button>
            </Link> */}
            <button
              onClick={submitHandler}
              className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
            >
              登入
            </button>
          </div>

          {/* <div id="g_id_onload"
              data-client_id="510894219524-4tg4ciiubm7got26edpggronmanpfg3p.apps.googleusercontent.com"
              data-login_uri= "localhost:8000/api/auth/google_login"
              data-prompt_parent_id="g_id_onload"
              class = "absolute top-100 right-30 w-500 h-300 z-1001">
                <button>G登入</button>
          </div> */}

          {/* # TODO: google login api 登入功能 */}
          {/* Google登入btn */}
          <div id="g_id_onload"
            data-client_id="510894219524-4tg4ciiubm7got26edpggronmanpfg3p.apps.googleusercontent.com"
            data-callback="handleCredentialResponse">
          </div>
          {/* data-login_uri="http://localhost:3000/" data-auto_select="true" // 啟用one top 視窗*/}
          {/* <div className="g_id_signin" data-type="standard"> className="g-signin2" data-onsuccess="handleCredentialResponse*/}
          <div className="g-signin2"> 
          {/*  className="g-signin2" data-onsuccess="onSignIn" */}
            <div id="googlebtn" ></div>
            <button
            onClick={submitHandler_google}
            className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
            >
              以Google帳號登入
            </button>
            <label
              htmlFor="name"
              className="mb-3 block text-center text-base font-bold"
            >
              還沒註冊?
            </label>
          </div>

          {/* 註冊btn */}
          <div>
            <Link href="register" passHref>
              <button className="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                註冊
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default IndexForm;
