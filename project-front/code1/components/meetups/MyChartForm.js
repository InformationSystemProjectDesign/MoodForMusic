import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import Head from "next/head";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import getBaseUrl from "../../pages/api/const";
import { useRouter } from "next/router";
import Script from 'next/script';

ChartJS.register(ArcElement, Tooltip, Legend);

// function loginJudge(){
//   let result;
//   // if(typeof window !== 'undefined'){
//   //   alert("尚未登入，請先登入");
//   //   result = 'login';
//   //   router.push('/');
//   // }
//   // if(sessionStorage.setItem('token') == "nothing"){
//   //   alert("尚未登入，請先登入");
//   //   result = 'login';
//   //   router.push('/');
//   // }
//   result = 'login yet.';
//   return result;
// }

// 情緒圖API
function MyChartForm() {
  // MyChartHandler();
  const [pie_data, setPieData] = useState({}); // 宣告pie_data和setPieData()，使用react的功能useState()
  useEffect(() => { MyChartHandler() }, []) // 新增 useEffect的方法，宣告MyChartHandler()，後面[]是指這個方法只會跑一次，不然會無限迴圈
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('token') == null) {
      alert("尚未登入，請先登入");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  ChartJS.defaults.font.size = 18;

  //let 將pie_data設為變數 (const表示不會變的值)
  // pie_data.overrides[lable].plugins.legend
  // let pie_data1 = {
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
  //     }
  //   ]
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
  if (Object.keys(pie_data) == 0) {
    return (
      <Fragment>
        {/* link */}
        {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"></link>
        <Head>
          <title>我的情緒圖</title>
          <meta
            name="description"
            content="Browse a huge list of active React meetups!"
          />
          <>
            <script src="https://accounts.google.com/gsi/client" async defer />
            <script src="https://apis.google.com/js/api:client.js" async defer />
            <script src="https://accounts.google.com/gsi/client" async defer />
          </>

          {/* <script>
            {
            function loginJudge(){
              let result;
              if(sessionStorage.getItem("token") == null){
                alert("尚未登入，請先登入");
                result = 'login';
                router.push('/');
              }
              result = 'login yet.';
              return result;
            }}
          </script> */}
        </Head>
        <div className="spinner-border text-secondary" role="status" id="loading_icon">
          <span className="sr-only">Loading...</span>
        </div>
        <span id="hint_message">系統正在為您取得文章資料，請耐心等待 謝謝您</span>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {/* link */}
        {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
        <script src="https://accounts.google.com/gsi/client" async />
        <Head>
          <title>我的情緒圖</title>
          <meta
            name="description"
            content="Browse a huge list of active React meetups!"
          />
        </Head>
        <div className="pb-12 max-h-full">
          <Pie data={pie_data}
            height={"420%"}
            options={{ maintainAspectRatio: false }} />
        </div>
      </Fragment>
    );
  }
}

export default MyChartForm;
