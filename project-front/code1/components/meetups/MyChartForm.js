import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import getBaseUrl from "../../pages/const";


ChartJS.register(ArcElement, Tooltip, Legend);

// 情緒圖API
function MyChartForm() {
  // MyChartHandler();
  const [pie_data, setPieData] = useState({}); // 宣告pie_data和setPieData()，使用react的功能useState()
  useEffect(() => {MyChartHandler()}, []) 

  //let 將pie_data設為變數 (const表示不會變的值)
  // let pie_data = {
  //   labels: ["怒", "哀", "喜", "愛", "懼", "恨"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [3,7,2,5,1,9],
  //       backgroundColor: [
  //         "rgba(255,144,118, 0.5)",
  //         "rgba(137,201,239, 0.5)",
  //         "rgba(254,217,93, 0.5)",
  //         "rgba(228,174,222, 0.5)",
  //         "rgba(133,220,187, 0.5)",
  //         "rgba(238,171,98, 0.5)",
  //       ],
  //       borderColor: [
  //         "rgba(255,144,118, 1)",
  //         "rgba(137,201,239, 1)",
  //         "rgba(254,217,93, 1)",
  //         "rgba(228,174,222, 1)",
  //         "rgba(133,220,187, 1)",
  //         "rgba(238,171,98, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  function MyChartHandler() {
    fetch(getBaseUrl + "article/my_chart", {
      method: "GET",
      // body: JSON.stringify(enteredMyChardata),  //GET不用body
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
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
        setPieData(result);
        // console.log("result", result);
        // pie_data['datasets']['data'] = result.result
      });

    // console.log("pie_data", pie_data);
  }
  if(Object.keys(pie_data) == 0){
    return (
      <Fragment>
        {/* link */}
        {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"></link>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
        <Head>
          <title>我的情緒圖</title>
          <meta
            name="description"
            content="Browse a huge list of active React meetups!"
          />
        </Head>
        <div class="spinner-border text-secondary" role="status" id="loading_icon"> 
          <span class="sr-only">Loading...</span>
        </div>
        <span id="hint_message">系統正在為您取得文章資料，請耐心等待 謝謝您</span>
      </Fragment>
    );
  } else {
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
}

export default MyChartForm;
