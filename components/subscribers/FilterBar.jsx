"use client";
import React, { useState } from "react";

const list = [
  {
    title: "Net new subscribers",
    value: "new",
  },
  {
    title: "Total subscribers",
    value: "total",
  },
  {
    title: "Purchases",
    value: "purchases",
  },
  {
    title: "Unsubscribes",
    value: "unsubscribes",
  },
];

const FilterBar = ({ active, setActive }) => {
  return (
    <div
      role="tablist"
      id="secondary-nav-tabs"
      className="relative whitespace-no-wrap leading-[22px] lg:flex gap-6 md:pl-0 md:pr-0 order-2 lg:order-1 rounded items-end justify-center lg:justify-start overflow-x-auto lg:overflow-x-visible hide-scroll smooth-scroll secondary-tabs"
    >
      {list.map((item) => (
        <button
          role="tab"
          aria-current="true"
          aria-controls="NetNew"
          onClick={() => setActive(item.value)}
          className={`h-16 inline-flex items-center leading-[22px] whitespace-no-wrap gap-2 px-1 font-semibold focus:outline-none border-b-2 focus-visible:bg-gray-50 hover:no-underline focus:no-underline ${
            active === item.value
              ? " border-red-500 text-red-500 hover:text-red-600 focus:text-red-600 "
              : "text-gray-700 hover:text-gray-800 focus:text-gray-800 border-none"
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
