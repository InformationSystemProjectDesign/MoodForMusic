import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

function IndexForm() {
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
            <Link href="register" passHref>
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                開始寫信...
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
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
            />
          </div>

          {/* 登入btn */}
          <div>
            <Link href="personal_space" passHref>
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                登入
              </button>
            </Link>
          </div>

          {/* Google登入btn */}
          <div>
            <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
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
