import Router, { useRouter } from "next/router";
import Head from "next/head";
import PersonalForm from "../../components/meetups/PersonalForm";
import Link from 'next/link';
import { Fragment } from "react";

// import Link from "next/link";


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

function PersonalPage() {
  const router = useRouter();

  async function PersonalHandler(enteredPersonalData) {
    const response = await fetch("/api/personal", {
      method: "POST",
      body: JSON.stringify(enteredPersonalData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>個人天地</title>
        <meta
          name="description"
          content="Login for the React meetups!"
        />
      </Head>
      

      {/* 個人表單 */}
      <PersonalForm onLogin={PersonalHandler} />
      
      
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

export default PersonalPage;