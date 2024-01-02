// import React from "react";
// import Chart from "@/components/forms/barChart";
import DateRangePicker from "@/components/shared/DateRangePicker";
const FormChart = ({ sum }) => {
  return (
    <div className="my-0 mx-auto relative w-[100%] py-[20px] px-0 items-center flex justify-between">
      <h2 className="text-[24px] font-semibold">Landing Page & Form Signups</h2>
      <div className="flex ">
        <ul className="p-0 m-0 flex  ml-[20px]">
          <li className="text-[#aaa] text-[14px] text-left list-none uppercase pl-0">
            <span className="text-[30px] block text-[#555] leading-[40px] font-medium">
              {sum.today}
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
        <DateRangePicker className={"ml-10 w-[100%] max-w-xs items-center"} />
      </div>
    </div>
  );
};

export default FormChart;
