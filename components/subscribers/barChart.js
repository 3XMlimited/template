"use client";
import React from "react";
// import AppContext from "@/context/Context";
import * as echarts from "echarts";
import { useEffect } from "react";

const Chart = ({ dates, data, active }) => {
  useEffect(() => {
    var chartDom = document.getElementById("echarts-container");
    var myChart = echarts.init(chartDom);
    let series;
    if (active === "new") {
      series = [
        {
          name: "Subscribers",
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

          data: data,
        },

        {
          name: "Cancellations",
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
          // data: Array.from([0]),
        },
      ];
    }
    if (active === "total") {
      series = [
        {
          name: "Subscribers",
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
          // areaStyle: {},
          data: data,
        },
      ];
    }
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
          data: dates,
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: {
        type: "value",
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },

      series: series,
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return (
    <div className="w-[100%] flex flex-col   max-lg:hidden">
      {/* <div className="lg:w-[50vw] ml-10 lg:relative flex flex-col justify-center align-middle content-center "> */}
      <div id="echarts-container" style={{ width: "100%", height: "400px" }} />

      {/* </div> */}
    </div>
  );
};
export default Chart;
