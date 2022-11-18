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

  var angry = 0;
  var sad = 0;
  var happy = 0;
  var love = 0;
  var afraid = 0;
  var hate = 0;
  // const [angry,setAngry] = useState(0);
  // const [sad,setSad] = useState(0);
  // const [happy,setHappy] = useState(0);
  // const [love,setLove] = useState(0);
  // const [afraid,setAfraid] = useState(0);
  // const [hate,setHate] = useState(0);

  function MyChartHandler() {
    fetch(getBaseUrl + "article", {
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
        for (var s in result) {
          if (result[s]["sencla"] == "怒") {
            angry++;
          } else if (result[s]["sencla"] == "哀") {
            sad++;
          } else if (result[s]["sencla"] == "喜") {
            happy++;
          } else if (result[s]["sencla"] == "愛") {
            love++;
          }
        }
        console.log(angry, sad, happy, love, afraid, hate);
        // pie_data.datasets.data[love].push();
        // pie_data.update();

        function addData(pie_data, data) {
          pie_data.datasets.data.push({data: data});
          pie_data.update();
      }
      // inserting the new dataset after 3 seconds
      setTimeout(function() {
         addData(pie_data, [love]);
      }, 5000);

        // setAngry(angry); setSad(sad); setHappy(happy),
        // setLove(love); setAfraid(afraid); setAfraid(afraid);

        // pie_data['datasets']['data'] = result.result
      });

    // console.log("pie_data", pie_data);
  }

  // class MyChartHandler extends React.Component {
  //   static async getInitialProps(ctx) {
  //     fetch(getBaseUrl + "article", {
  //       method: "GET",
  //       // body: JSON.stringify(enteredMyChardata),  //GET不用body
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => {
  //         console.log("res", res);
  //         if (res.ok) {
  //           return res.json(); //將收到的值改為json格式
  //         } else {
  //           console.log("get api error");
  //         }
  //       })
  //       .then((result) => {
  //         console.log("result", result);
  //         for (var s in result) {
  //           if (result[s]["sencla"] == "怒") {
  //             angry++;
  //           } else if (result[s]["sencla"] == "哀") {
  //             sad++;
  //           } else if (result[s]["sencla"] == "喜") {
  //             happy++;
  //           } else if (result[s]["sencla"] == "愛") {
  //             love++;
  //           }
  //         }
  //         console.log(angry, sad, happy, love, afraid, hate);
  //         pie_data.datasets.data[love].push();
  //         pie_data.update();

  //         // setAngry(angry); setSad(sad); setHappy(happy),
  //         // setLove(love); setAfraid(afraid); setAfraid(afraid);

  //         // pie_data['datasets']['data'] = result.result
  //       });

  //     // console.log("pie_data", pie_data);
  //   }
  // }

  //let 將pie_data設為變數 (const表示不會變的值)
  
  let pie_data = {
    labels: ["怒", "哀", "喜", "愛", "懼", "恨"],
    datasets: [
      {
        label: "# of Votes",
        data: [[angry], [sad], [happy], [love], [afraid], [hate]],
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
        <Pie id="myPieChart" data={pie_data} />;
      </div>
    </Fragment>
  );
}

export default MyChartForm;
