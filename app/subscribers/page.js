"use client";
import React, { useState, useEffect } from "react";
import FilterBar from "@/components/subscribers/FilterBar";
import DateRangePicker from "@/components/shared/DateRangePicker";
import Chart from "@/components/subscribers/barChart";
import moment from "moment";
// import { EmailsTotal } from "../action/totalSubscribers";
import LabelBar from "@/components/subscribers/LabelBar";
import SubscriptionContent from "@/components/subscribers/SubscriptionContent";
import SubscriptionRightBar from "@/components/subscribers/SubscriptionRightBar";
import { exportCsv, getDaysArray } from "@/utils/utils";

const page = () => {
  // const fetchNext

  const [active, setActive] = useState("new");
  const [date, setDate] = useState({
    from: new Date(moment().subtract(14, "days")),
    to: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([1, 2, 3]);
  const [rules, setRules] = useState({});
  useEffect(() => {
    setRules({ date: { $in: getDaysArray(date?.from, date?.to) } });
  }, [date]);
  // export csv
  const fetchExports = async () => {
    console.log(date);
    if (date.to === undefined) {
      date.to = date.from;
    }
    const range = getDaysArray(date.from, date.to);
    const rules = { date: { $in: range } };
    const response = await fetch("/api/subscription", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rules,
      }),
    });
    const data = await response.json();
    console.log(data);
    exportCsv(data, date);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rules,
        pageNumber: pageNumber - 1,
      }),
    });
    const result = await response.json();
    setEmails(result);
    setIsLoading(false);
    return;
  };
  useEffect(() => {
    if (date.from === undefined && date.to === undefined) {
      return;
    }
    if (date.to === undefined) {
      date.to = date.from;
    }
    if (date.from === undefined) {
      date.from = date.to;
    }
    const range = getDaysArray(date.from, date.to);
    const newRules = { date: { $in: range } };
    setRules(newRules);
  }, [date]);

  return (
    <div className="relative border-b border-gray-200 bg-white ">
      {/* title */}
      <div
        className="mx-auto px-8 lg:h-20 flex justify-between flex-col lg:flex-row pt-8 pb-5 bg-white  z-10 "
        style={{ maxWidth: "min(100%, 1440px)" }}
      >
        <h2 className="flex-grow text-[24px] leading-8 font-semibold text-center md:text-left mb-4 lg:mb-0">
          Subscribers
        </h2>
        <div className="flex  lg:items-center gap-1 md:gap-2 flex-col md:flex-row"></div>
      </div>

      {/* sub bar */}
      <div
        className="mx-auto px-8 border-b border-gray-200 "
        style={{ maxWidth: "min(100%, 1440px)" }}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
          <FilterBar active={active} setActive={setActive} />
          <div className="pb-2 order-1 lg:order-2 flex flex-col md:flex-row items-center gap-2 flex-grow lg:flex-wrap justify-center lg:justify-end">
            <button
              data-reach-tooltip-trigger=""
              className="mr-2 border border-solid  leading-[22px] focus:outline-none border-gray-200 text-base p-2 rounded text-gray-800 bg-white hover:bg-gray-50 focus:outline-blue"
              onClick={fetchExports}
            >
              <span
                style={{
                  border: "0px",
                  clip: "rect(0px, 0px, 0px, 0px)",
                  height: "1px",
                  margin: "-1px",
                  overflow: "hidden",
                  padding: "0px",
                  position: "absolute",
                  width: "1px",
                  whiteSpace: "nowrap",
                  overflowWrap: "normal",
                }}
              >
                Export
              </span>
              <svg
                className="fill-current  inline-block overflow-visible w-6 h-6 pointer-events-none"
                name="download-bottom"
                viewBox="0 0 24 24"
                style={{ fontSize: "inherit" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12 3.25a.75.75 0 0 1 .75.75v8.856l2.276-2.275a.75.75 0 0 1 1.06 1.06l-3.551 3.552a.777.777 0 0 1-.225.157.747.747 0 0 1-.84-.153l-3.556-3.556a.75.75 0 1 1 1.06-1.06l2.276 2.275V4a.75.75 0 0 1 .75-.75zm8.75 13.194a.75.75 0 0 0-1.5 0 2.806 2.806 0 0 1-2.806 2.806H7.556a2.806 2.806 0 0 1-2.806-2.806h-1.5a4.306 4.306 0 0 0 4.306 4.306h8.888a4.306 4.306 0 0 0 4.306-4.306z"></path>
                <path d="M12 3.25a.75.75 0 0 1 .75.75v8.856l2.276-2.275a.75.75 0 0 1 1.06 1.06l-3.551 3.552a.777.777 0 0 1-.225.157.747.747 0 0 1-.84-.153l-3.556-3.556a.75.75 0 1 1 1.06-1.06l2.276 2.275V4a.75.75 0 0 1 .75-.75zm8.75 13.194a.75.75 0 0 0-1.5 0 2.806 2.806 0 0 1-2.806 2.806H7.556a2.806 2.806 0 0 1-2.806-2.806h-1.5a4.306 4.306 0 0 0 4.306 4.306h8.888a4.306 4.306 0 0 0 4.306-4.306z"></path>
              </svg>
            </button>
            <div className="w-full md:w-auto">
              <span
                style={{
                  border: "0px",
                  clip: "rect(0px, 0px, 0px, 0px)",
                  height: "1px",
                  margin: "-1px",
                  overflow: "hidden",
                  padding: "0px",
                  position: "absolute",
                  width: "1px",
                  whiteSpace: "nowrap",
                  overflowWrap: "normal",
                }}
              >
                <label id="downshift-0-label" for="downshift-0-toggle-button">
                  "" Select time interval
                </label>
              </span>
              <button
                type="button"
                className="inline-flex items-center leading-tight border border-gray-200 text-sm gap-2 rounded pr-2 pl-4 py-2 leading-5 rounded h-10 px-2 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none w-full"
                id="downshift-0-toggle-button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-labelledby="downshift-0-label downshift-0-toggle-button"
              >
                <span className="flex-grow text-left truncate">Days</span>
                <svg
                  className="fill-current inline-block overflow-visible w-6 h-6"
                  name="down"
                  viewBox="0 0 24 24"
                  style={{ fontSize: "inherit" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <DateRangePicker date={date} setDate={setDate} />
          </div>
        </div>
      </div>
      <div className="flex flex-col border-x-2 border-gray-200 ">
        <Chart />

        {/* <EmailsTotal /> */}
        <LabelBar />
        <div className="flex flex-col lg:flex-row lg:flex-wrap  h-[600px]">
          <SubscriptionRightBar
            setRules={setRules}
            setEmails={setEmails}
            fetchData={fetchData}
          />
          <SubscriptionContent
            emails={emails}
            rules={rules}
            setEmails={setEmails}
            setIsLoading={setIsLoading}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageArray={pageArray}
            setPageArray={setPageArray}
            fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
