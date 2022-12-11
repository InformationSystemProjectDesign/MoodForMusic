import Head from "next/head";

import IndexForm from "../components/meetups/IndexForm";
import { Fragment } from "react";
import Script from 'next/script';


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
        {/* loading script的地方 */}
        <title>首頁</title>
        <meta
          name="description"
          content="Register for the React Meetups!"
        />
        <>
          <script src="https://apis.google.com/js/api:client.js" async defer /> {/* https://apis.google.com/js/api:client.js https://apis.google.com/js/platform.js*/}
          <script src="https://accounts.google.com/gsi/client" async defer />
          <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.js" async defer />
          <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.1.min.js" async defer />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous" async />
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous" async />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous" async />
          {/* <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"  async defer/> */}
        </>
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
