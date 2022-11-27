import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import getBaseUrl from "../../pages/const";
import { useRouter } from "next/router";

// 一般登入api
function IndexForm() {
  const emailInputRef = useRef(); //和email的input綁起來
  const passwordInputRef = useRef(); //和password的input綁起來

  const router = useRouter();

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
    
    fetch(getBaseUrl + "auth/google_login", {
      method: "POST",
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
        throw "登入失敗";
      }
    })
    .then((data) => {
      /*接到request data後要做的事情*/
      sessionStorage.setItem("token", data.token);  //儲存token
      router.push('/personal_space')  //跳轉頁面
    })
    .catch((e) => {
      /*發生錯誤時要做的事情*/
      console.log("ee", e);
      alert('登入失敗') //系統頁面提示訊息登入失敗
    });
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>登入</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>

      <div class="grid grid-cols-2 gap-x-10">
        {/*歡迎文字區*/}
        <div class="grid grid-rows-4  gap-y-4 mt-12">
          <div class="text-6xl">邀請您</div>
          <div class="text-6xl">一起向未來</div>
          <div class="text-6xl">寄封信。</div>
          <div>
            <Link href="#">
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                <a
                  onClick={e => {
                    e.preventDefault()

                    if(sessionStorage.getItem("token") == null){
                      alert('尚未登入，不能寫信')
                    }else{
                      router.push("/personal_space/SendArticle");
                    }                  
                  }}>
                    開始寫信...
                </a>
              </button>
            </Link>
          </div>
        </div>

        {/* 登入表單 */}
        <div class="grid gap-y-3 mx-auto w-full max-w-[550px]">
          <label for="name" class="mb-3 block text-center text-3xl font-bold">
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
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
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
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
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
              class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
            >
              登入
            </button>
          </div>

          {/* # TODO: google login api 登入功能 */}
          {/* Google登入btn */}
          <div>
            <button
            onClick={submitHandler_google}
            class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
            >
              以Google帳號登入
            </button>
            <label
              for="name"
              class="mb-3 block text-center text-base font-bold"
            >
              還沒註冊?
            </label>
          </div>

          {/* 註冊btn */}
          <div>
            <Link href="register" passHref>
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
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
