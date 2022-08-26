import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "..//components/meetups/MeetupList";
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

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>知音</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
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

export default HomePage;
