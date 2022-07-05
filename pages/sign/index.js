import Head from "next/head";
import { MongoClient } from "mongodb";

import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First App",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%E7%8E%89%E5%B1%B1%E4%B8%BB%E5%B3%B0_01.jpg/1536px-%E7%8E%89%E5%B1%B1%E4%B8%BB%E5%B3%B0_01.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second App",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Yushan_main_east_peak%2BHuang_Chung_Yu%E9%BB%83%E4%B8%AD%E4%BD%91%2B9030.png/1920px-Yushan_main_east_peak%2BHuang_Chung_Yu%E9%BB%83%E4%B8%AD%E4%BD%91%2B9030.png",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function SignPage(props) {
  return (
    <Fragment>
      <Head>
        <title>註冊</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 註冊表單 */}
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <label
              for="name"
              class="mb-3 block text-center text-3xl font-medium text-[#07074D]"
            >
              登入
            </label>
            
            {/* 帳號 */}
            <div class="mb-5">              
              <input
                type="text"
                name="name"
                id="name"
                placeholder="帳號"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
              />
            </div>

            {/* 密碼 */}
            <div class="mb-5">              
              <input
                type="email"
                name="email"
                id="email"
                placeholder="密碼"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800  focus:shadow-md"
              />
            </div>

            {/* 登入btn */}
            <div class="mb-5">
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border border-gray-800 text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                登入
              </button>
            </div>

            {/* Google登入btn */}
            <div class="mb-5">
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border border-gray-800 text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                以Google帳號登入
              </button>
            </div>

            <label
              for="name"
              class="mb-3 block text-center text-base font-bold text-[#07074D]"
            >
              還沒註冊?
            </label>

            {/* 註冊btn */}
            <div class="mb-5">
              <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border border-gray-800 text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none">
                註冊
              </button>
            </div>

          </form>
        </div>
      </div>
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch dada from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch dada from an API
  const client = await MongoClient.connect(
    "mongodb+srv://happyday99:happy@cluster0.pflxs.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //10秒就重抓資料一次
  };
}

export default SignPage;
