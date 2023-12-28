"use client";
import Image from "next/image";
import React from "react";
// import AppContext from "@/context/Context";
import * as echarts from "echarts";
import { useEffect } from "react";

const Chart = () => {
  let results = [];

  useEffect(() => {
    var chartDom = document.getElementById("echarts-container");
    var myChart = echarts.init(chartDom);

    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    for (let i = 0; i < 10; i++) {
      xAxisData.push("Class" + i);
      data1.push(+(Math.random() * 2).toFixed(2));
      data2.push(+(Math.random() * 5).toFixed(2));
      data3.push(+(Math.random() + 0.3).toFixed(2));
      data4.push(+Math.random().toFixed(2));
    }
    var emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        // normal: { color: "blue" },
        color: "purple",
        shadowColor: "rgba(0,0,0,0.3)",
      },
    };

    let option = {
      legend: {
        data: ["bar", "bar2", "bar3", "bar4"],
        left: "10%",
      },

      toolbox: {
        feature: {
          magicType: {
            // type: ["stack"],
          },
          //   dataView: {},
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        // name: "X Axis",
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
      },
      yAxis: {},
      grid: {
        bottom: 100,
      },
      series: [
        {
          name: "bar",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          itemStyle: {
            shadowBlur: 10,
            // normal: { color: "blue" },
            color: "blue",
            shadowColor: "rgba(0,0,0,0.3)",
          },
          data: data1,
        },
        {
          name: "bar2",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          itemStyle: {
            shadowBlur: 10,
            // normal: { color: "blue" },
            // color: "green",
            shadowColor: "rgba(0,0,0,0.3)",
          },
          data: data2,
        },
        {
          name: "bar3",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          itemStyle: {
            shadowBlur: 10,
            // normal: { color: "blue" },
            // color: "red",
            shadowColor: "rgba(0,0,0,0.3)",
          },
          data: data3,
        },
        {
          name: "bar4",
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          itemStyle: {
            shadowBlur: 10,
            // normal: { color: "blue" },
            // color: "orange",
            shadowColor: "rgba(0,0,0,0.3)",
          },
          data: data4,
        },
      ],
      itemStyle: {
        color: "blue",
      },
    };
    myChart.on("brushSelected", function (params) {
      var brushed = [];
      var brushComponent = params.batch[0];
      //   for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      //     var rawIndices = brushComponent.selected[sIdx].dataIndex;
      //     brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
      //   }
      myChart.setOption({
        title: {
          backgroundColor: "#333",
          text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
          bottom: 0,
          right: "10%",
          width: 100,
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
      });
    });

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
