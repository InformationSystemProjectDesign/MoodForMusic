import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";


function MyChartForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const MyChartData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(MyChartData);
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <Head>
        <title>我的情緒圖</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      

    </Fragment>
  );
}

export default MyChartForm;
