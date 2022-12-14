import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import MyChartForm from "../../../components/meetups/MyChartForm";


function MyChartPage() { 
  
    return (
      <Fragment>
        <Head>
          <title>註冊</title>
          <meta
            name="description"
            content="Register for the React Meetups!"
          />
        </Head>
        <MyChartForm />
      </Fragment>
    );
  }
 
  
  export default MyChartPage;
