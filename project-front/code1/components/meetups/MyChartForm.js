import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import getBaseUrl from "../../pages/const";

ChartJS.register(ArcElement, Tooltip, Legend);

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
          "rgba(85,94,123, 0.5)",
          "rgba(124,204,229, 0.5)",
          "rgba(253,228,127, 0.5)",
          "rgba(224,70,68, 0.5)",
          "rgba(181,118,173, 0.5)",
          "rgba(183,217,104 0.5)",
        ],
        borderColor: [
          "rgba(85,94,123, 1)",
          "rgba(124,204,229, 1)",
          "rgba(253,228,127, 1)",
          "rgba(224,70,68, 1)",
          "rgba(181,118,173, 1)",
          "rgba(183,217,104, 1)",
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

    console.log("pie_datap", pie_data);
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
