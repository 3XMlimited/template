import React, { useEffect, useState } from "react";
import { fetchLabelData } from "@/utils/utils";

const LabelBar = ({ data, setData }) => {
  // const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchLabelData();
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <div className=" border-b border-gray-200 ">
      <div className="bg-white border-t-2 border-gray-200 flex min-h-[97px] ">
        <div className="flex w-full ">
          {/* lifetime */}
          <div
            className="flex justify-between py-[20px] px-[40px]   border-r-2 border-[#dde2e7] pl-[25px]"
            style={{ flex: "0 0 349px" }}
          >
            <div className="flex  flex-col items-center justify-center   ">
              <span className="text-[12px] leading-[16px] font-bold text-gray-700 uppercase tracking-wide">
                Lifetime totals
              </span>
            </div>
            <div class="flex  flex-col items-center justify-center   ">
              <span className="text-[25px] font-bold mb-[5px]">
                {data?.total || 0}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-[#6a6e72]">
                Total subscriber
              </span>
            </div>
          </div>
          {/* last 90 days */}
          <div
            className="flex justify-between py-[20px] px-[40px]  flex-grow border-r-2 border-gray-200 min-w-[50%] "
            style={{ flex: "0 0 349px" }}
          >
            <div className="flex  flex-col items-center justify-center   ">
              <span className="text-[12px] leading-[16px] font-bold text-gray-700 uppercase tracking-wide">
                Last 90 days
              </span>
            </div>
            <div class="flex  flex-col items-center justify-center   ">
              <span className="text-[25px] font-bold mb-[5px]">0.00%</span>
              <span className="text-[11px] uppercase tracking-wide text-[#6a6e72]">
                Avg open rate
              </span>
            </div>
            <div class="flex  flex-col items-center justify-center   ">
              <span className="text-[25px] font-bold mb-[5px]">0.00%</span>
              <span className="text-[11px] uppercase tracking-wide text-[#6a6e72]">
                Avg click rate
              </span>
            </div>
            <div class="flex  flex-col items-center justify-center   ">
              <span className="text-[25px] font-bold mb-[5px]">0</span>
              <span className="text-[11px] uppercase tracking-wide text-[#6a6e72]">
                emails sent
              </span>
            </div>
          </div>

          {/* today */}
          <div
            className="flex justify-between  py-[20px] px-[40px]  "
            style={{ flex: "0 0 349px" }}
          >
            <div className="flex  flex-col items-center justify-center   ">
              <span className="text-[12px] leading-[16px] font-bold text-gray-700 uppercase tracking-wide">
                Today
              </span>
            </div>
            <div class="flex  flex-col items-center justify-center    ">
              <span className="text-[25px] font-bold mb-[5px]">
                {data?.today | 0}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-[#6a6e72]">
                New subscribers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelBar;
