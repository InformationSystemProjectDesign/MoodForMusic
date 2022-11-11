import Head from "next/head";

import IndexForm from "../components/meetups/IndexForm";
import { Fragment } from "react";


// /api/new-meetup
// POST /api/new-meetup

function HomePage(props) {

  async function IndexHandler(enteredIndexData) {
    const response = await fetch("/api/index", {
      method: "POST",
      body: JSON.stringify(enteredIndexData),
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
        <Head>
          <title>首頁</title>
          <meta
            name="description"
            content="Register for the React Meetups!"
          />
        </Head>
        <IndexForm onIndex={IndexHandler} />
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

// export async function getStaticProps() {
//   // fetch dada from an API
  

//   return {
//     props: {
//       meetups: meetups.map((meetup) => ({
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString(),
//       })),
//     },
//     revalidate: 10, //10秒就重抓資料一次
//   };
// }

export default HomePage;
