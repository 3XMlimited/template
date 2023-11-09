"use client";
import Image from "next/image";
import React from "react";
import AppContext from "@/context/Context";
import * as echarts from "echarts";
import { useEffect } from "react";

import { useContext } from "react";

const Chart = ({ questions }) => {
  console.log("query", questions);
  let results = [];
  questions.categories.map((r) => {
    if (r !== "") {
      results.push({
        name: r,
        value: 0,
      });
    }
  });
  const budget = 0;
  const cult = 0;
  const language = 0;
  const academic = 0;
  const location = 0;
  useEffect(() => {
    const chartDom = document.getElementById("echarts-container");
    const myChart = echarts.init(chartDom);

    let option = {
      title: {
        text: "Your Overall Score",
        // subtext: `${(location + academic + language + budget + cult) * 10}%`, // Calculate the overall score
        subtext: `${Math.min(
          (location + academic + language + budget + cult) * 10,
          100
        )}%`,
        left: "center",
        top: "center",
        textStyle: {
          color: "#fff", // Set the text color
          fontSize: "1rem", // Adjust the font size as needed
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        show: false, // Set this to false to hide the legend
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          // name: 'Access From',
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#000",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside", // Set this to 'outside' to display names outside the chart
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
          },
          labelLine: {
            show: true, // Set this to true to show lines connecting names to the chart
            length: 30, // You can adjust the length of the lines as needed
          },
          data: results,
          // [
          //   { value: budget, name: "Category1" },
          //   { value: location, name: "Category2" },
          //   { value: academic, name: "Category3" },
          //   { value: language, name: "Category4" },
          //   { value: cult, name: "Category5" },
          // ],
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="  h-full w-full min-w-full flex flex-col mx-auto  bg-black  max-lg:hidden">
      <div className="h-full w-full min-w-full flex lg:flex-row flex-col mx-auto  ">
        <div className="lg:w-[50vw] ml-10 lg:relative flex flex-col justify-center align-middle content-center ">
          <div
            id="echarts-container"
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
