import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import MailRecordForm from "../../../components/meetups/MailRecordForm";

function MailRecordPage() {
    const router = useRouter();
  
    async function MailRecordHandler(enteredMailRecordData) {
      const response = await fetch("/api/MailRecord", {
        method: "POST",
        body: JSON.stringify(enteredMailRecordData),
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
        <MailRecordForm onMailRecord={MailRecordHandler} />
      </Fragment>
    );
  }
  
  
  export default MailRecordPage;
