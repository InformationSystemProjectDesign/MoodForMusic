import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import SendArticleForm from "../../../components/meetups/SendArticleForm";
import { MongoClient } from "mongodb";

function SendArticlePage() {
    const router = useRouter();
  
    async function SendArticleHandler(enteredSendArticleData) {
      const response = await fetch("/api/sendArticle", {
        method: "POST",
        body: JSON.stringify(enteredSendArticleData),
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
        <SendArticleForm onSendArticle={SendArticleHandler} />
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
  
  export default SendArticlePage;
