import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import { Pie } from 'react-chartjs-2';


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

    const pie_data = {
      labels: ['Red', 'Orange', 'Blue'],
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    //   datasets: [
    //       {
    //         label: 'Popularity of colours'
    //         data: [55, 23, 96],
    //         // you can set indiviual colors for each bar
    //         backgroundColor: [
    //           'rgba(255, 255, 255, 0.6)'
    //           'rgba(255, 255, 255, 0.6)'
    //           'rgba(255, 255, 255, 0.6)'
    //         ],
    //         borderWidth: 1,
    //       }
    //   ]
    }
    // const [pie_data] = useState({})
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
