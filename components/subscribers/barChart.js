"use client";
import React from "react";
// import AppContext from "@/context/Context";
import * as echarts from "echarts";
import { useEffect } from "react";

const Chart = () => {
  let results = [];

  useEffect(() => {
    var chartDom = document.getElementById("echarts-container");
    var myChart = echarts.init(chartDom);

    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },

      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: {
        type: "value",
      },

      series: [
        {
          name: "Evaporation",
          type: "bar",

          tooltip: {
            valueFormatter: function (value) {
              return value + " new subscribers";
            },
          },
          itemStyle: {
            shadowBlur: 10,

            color: "rgba(62,163,128)",
            shadowColor: "rgba(0,0,0,0.3)",
          },

          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
        },

        {
          name: "Temperature",
          type: "line",
          tooltip: {
            valueFormatter: function (value) {
              return value;
            },
          },
          itemStyle: {
            shadowBlur: 10,

            color: "black",
            shadowColor: "rgba(0,0,0,0.3)",
          },
          data: [
            2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
          ],
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="  h-full w-full min-w-full flex flex-col mx-auto    max-lg:hidden">
      <div className="h-full w-full min-w-full flex lg:flex-row flex-col max-auto ">
        {/* <div className="lg:w-[50vw] ml-10 lg:relative flex flex-col justify-center align-middle content-center "> */}
        <div
          id="echarts-container"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      {/* </div> */}
    </div>
  );
};
export default Chart;
