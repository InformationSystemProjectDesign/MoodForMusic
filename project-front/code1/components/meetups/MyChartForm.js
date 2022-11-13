import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import getBaseUrl from "../../pages/const";

ChartJS.register(ArcElement, Tooltip, Legend);

// 情緒圖API
function MyChartForm() {
  MyChartHandler();

  //let 將pie_data設為變數 (const表示不會變的值)
  let pie_data = {
    labels: ["怒", "哀", "喜", "愛", "懼", "恨"],
    datasets: [
      {
        label: "# of Votes",
        data: [3,7,2,5,1,9],
        backgroundColor: [
          "rgba(255,144,118, 0.5)",
          "rgba(137,201,239, 0.5)",
          "rgba(254,217,93, 0.5)",
          "rgba(228,174,222, 0.5)",
          "rgba(133,220,187, 0.5)",
          "rgba(238,171,98, 0.5)",
        ],
        borderColor: [
          "rgba(255,144,118, 1)",
          "rgba(137,201,239, 1)",
          "rgba(254,217,93, 1)",
          "rgba(228,174,222, 1)",
          "rgba(133,220,187, 1)",
          "rgba(238,171,98, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  function MyChartHandler() {
    fetch(getBaseUrl + "crawler/test", {
      method: "GET",
      // body: JSON.stringify(enteredMyChardata),  //GET不用body
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.ok) {
          return res.json(); //將收到的值改為json格式
        } else {
          console.log("get api error");
        }
      })
      .then((result) => {
        console.log("result", result);
        // pie_data['datasets']['data'] = result.result
      });

    // console.log("pie_data", pie_data);
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
      <div>
        <Pie data={pie_data} />;
      </div>
    </Fragment>
  );
}

export default MyChartForm;
