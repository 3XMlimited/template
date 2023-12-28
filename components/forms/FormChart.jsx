import React from "react";
import Chart from "@/components/forms/barChart";
import DateRangePicker from "@/components/shared/DateRangePicker";
const FormChart = ({ sum }) => {
  return (
    <div className="overflow-hidden bg-white border-b border-gray-200 h-[520px]">
      <div className="container">
        <div className="my-0 mx-auto relative w-[100%] py-[20px] px-0 items-center flex justify-between">
          <h2 className="text-[24px] font-inherit">
            Landing Page & Form Signups
          </h2>
          <ul className="p-0 m-0 flex  ">
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-0">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.today}
              </span>
              Today
            </li>
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-[25px]">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.day7}
              </span>
              7 Days
            </li>
            <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-[25px]">
              <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
                {sum.day30}
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
          {/* <DateRangePicker className={""} /> */}
        </div>

        <Chart />
      </div>
    </div>
  );
};

export default FormChart;
