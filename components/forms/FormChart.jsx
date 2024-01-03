"use client";
import React, { useEffect, useState } from "react";

import Chart from "@/components/forms/barChart";
import moment from "moment";
import { getDaysArray } from "@/utils/utils";
import DateRangePicker from "@/components/shared/DateRangePicker";

const FormChart = ({ sum }) => {
  const [date, setDate] = useState({
    from: new Date(moment().subtract(14, "days")),
    to: new Date(),
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchFormsCount = async () => {
      const response = await fetch("/api/result/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rules: {
            date: { $in: [moment().subtract(1, "days").format("YYYY-MM-DD")] },
          },
        }),
      });
      const result = await response.json();

      return result;
    };
    const fetchChart = async () => {
      const formsCount = await fetchFormsCount();
      console.log("Count", formsCount);
      let data = [];
      formsCount[0]?.forms.map((r) => {
        data.push({ name: r.name, data: [] });
      });
      const range = getDaysArray(date?.from, date?.to);
      const response = await fetch("/api/result/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rules: { date: { $in: range } },
        }),
      });
      const result = await response.json();

      range.map((d) => {
        let sub = result.filter((r) => r.date === d);

        if (sub[0]) {
          Object.keys(sub[0].forms).map((o, i) => {
            if (data.map((d) => d.name).includes(sub[0].forms[i].name)) {
              data.map((da) => {
                if (da.name === sub[0].forms[i].name) {
                  da.data.push(sub[0].forms[i].subscriptions);
                }
              });
            }
          });
        } else {
          data.map((d) => {
            d.data.push(0);
          });
        }
      });

      // console.log("chart", data);

      setChartData(data);

      return;
    };
    if (date?.from && date?.to) {
      fetchChart();
    }
  }, [date]);

  return (
    <>
      <div className="my-0 mx-auto relative w-[100%] py-[20px] px-0 items-center flex justify-between">
        <h2 className="text-[24px] font-semibold">
          Landing Page & Form Signups
        </h2>
        <div className="flex ">
          <ul className="p-0 m-0 flex  ml-[20px]">
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-0">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum?.today}
              </span>
              Today
            </li>
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-[25px]">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.days7}
              </span>
              7 Days
            </li>
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-[25px]">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.days30}
              </span>
              30 Days
            </li>
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-[25px]">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.total}
              </span>
              Total
            </li>
          </ul>
          <DateRangePicker
            className={"ml-10 w-[100%] max-w-xs items-center"}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
      <Chart date={getDaysArray(date?.from, date?.to)} data={chartData} />
    </>
  );
};

export default FormChart;
