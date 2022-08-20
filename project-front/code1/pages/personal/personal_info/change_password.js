import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import RegisterForm from "../../../components/meetups/ChangePasswordForm";
import { MongoClient } from "mongodb";

function ChangePasswordPage() {
  const router = useRouter();

  async function ChangePasswordHandler(enteredChangePasswordData) {
    const response = await fetch("/api/ChangePassword", {
      method: "POST",
      body: JSON.stringify(enteredChangePasswordData),
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
        <title>註冊</title>
        <meta
          name="description"
          content="Register for the React Meetups!"
        />
      </Head>
      <RegisterForm onChangePassword={ChangePasswordHandler} />
    </Fragment>
  );
}

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

export default ChangePasswordPage;