"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MotionDiv } from "@/components/motion/MontionDiv";

const FormBox = ({ form, setState, setIsLoading, index }) => {
  const [result, setResult] = useState({});

  const fetchDelete = async (_id) => {
    setIsLoading(true);

    const response = await fetch("/api/form", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const result = await response.json();
    console.log(result);
    setIsLoading(false);
    setState(true);
  };

  const fetchGetSubscriptions = async () => {
    // setIsLoading(true);

    const response = await fetch(`/api/subscription/${form._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    setResult({
      count: result?.total_subscriptions,
    });

    return result;
  };

  useEffect(() => {
    fetchGetSubscriptions();
  }, [form]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="bg-white rounded-lg shadow flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mx-4 my-5">
        <div className="flex items-center w-11/12">
          <svg
            class="fill-current inline-block overflow-visible w-6 h-6 text-blue-500 mr-3"
            name="landing-page"
            viewBox="0 0 24 24"
            style={{ fontSize: "inherit" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M4.8 6.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm3.27-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.77.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"></path>
            <path
              fill-rule="evenodd"
              d="M22.75 19V5A2.75 2.75 0 0 0 20 2.25H4A2.75 2.75 0 0 0 1.25 5v14A2.75 2.75 0 0 0 4 21.75h16A2.75 2.75 0 0 0 22.75 19zM4 3.75c-.69 0-1.25.56-1.25 1.25v2.25h18.5V5c0-.69-.56-1.25-1.25-1.25H4zm4.25 5h-5.5V19c0 .69.56 1.25 1.25 1.25h4.25V8.75zm1.5 11.5v-5.5h11.5V19c0 .69-.56 1.25-1.25 1.25H9.75zm0-7h11.5v-4.5H9.75v4.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <Link
            href="/"
            className="text-sky-500 hover:no-underline hover:text-sky-600 text-lg font-semibold"
          >
            {form.name}
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              aria-haspopup="true"
              aria-controls="menu--207"
              className="focus:outline-blue"
              data-reach-menu-button=""
              type="button"
              id="menu-button--menu--207"
            >
              <svg
                className="fill-current inline-block overflow-visible w-6 h-6 w-12 h-12 text-gray-500 hover:text-gray-700 p-1"
                name="menu-horizontal"
                viewBox="0 0 24 24"
                style={{ fontSize: "inherit" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M16.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
              </svg>
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
                Open action menu
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{form.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/" target="_blank">
              <DropdownMenuItem>Open New Tab</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => fetchDelete(form._id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mx-4 mb-4 flex-flex-col gap-4">
        <div>
          <div className="font-semibold text-gray-700 uppercase text-[12px]">
            Total subscribers
          </div>
          <div className="text-gray-800 uppercase font-semibold text-base leading-7 text-[16px]">
            {result?.count}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-gray-900 font-semibold text-sm mb-4">
            Last 90 days
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="text-gray-700 uppercase font-semibold text-[12px]">
                Visitors
              </div>
              <div className="text-[16px] text-gray-800 font-semibold">0</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-700 uppercase font-semibold text-[12px]">
                Subscribers
              </div>
              <div className="text-[16px] text-gray-800 font-semibold">
                {result?.count}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-700 uppercase font-semibold text-[12px]">
                CONVERSION RATE
              </div>
              <div className="text-[16px] text-gray-800 font-semibold">0</div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default FormBox;
