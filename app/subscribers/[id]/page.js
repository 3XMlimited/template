"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import moment from "moment";
import Link from "next/link";
const page = () => {
  let pathname = usePathname();
  pathname = pathname.split("/");
  pathname = pathname[pathname.length - 1];
  const [active, setActive] = useState("forms");
  const [subscriber, setSubscriber] = useState({});

  const list = [
    {
      title: "Email history",
      value: "history",
    },
    {
      title: "Automations",
      value: "automation",
    },
    {
      title: "Sequences",
      value: "sequences",
    },
    {
      title: "Forms",
      value: "forms",
    },
    {
      title: "Purchases",
      value: "purchases",
    },
  ];

  const fetchSubscribers = async () => {
    const response = await fetch(`/api/subscribers/${pathname}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    setSubscriber(data.emails);
    // setSubscribers(data.emails);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const updateSubscriber = async () => {
    const response = await fetch(`/api/subscribers/${pathname}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriber),
    });
    const data = await response.json();
    // console.log(data);
    await fetchSubscribers();
  };
  const FormBox = ({ id, topic, date }) => {
    return (
      <div className="relative rounded border border-gray-200 p-6 pr-10 min-w-[400px]">
        <div className="mb-3">
          <Link
            href={`/forms/${id}`}
            className="text-black font-semibold hover:text-red-500 hover:no-underline"
          >
            {topic}
          </Link>
        </div>
        <div className="flex ">
          <div className="  border border-[#3ea380] text-[#3ea380] hover:bg-[#3ea380] hover:text-white items-center rounded-[5px] text-[11px] leading-[11px] py-[3px]  px-[6px]  h-[23px] font-medium  flex ease-out">
            Active
          </div>
          <div className="text-[12px] leading-4 ml-2 inline-block cursor-pointer mt-1">
            Subscribed on {moment(date).format("MMM,DD, YYYY")}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap w-[100%]">
      <div className="my-[30px] p-0 border border-gray-200 shadow-md rounded-[4px] w-[350px] min-h-[250px] ">
        <div className=" rounded-[4px] p-[25px] relative overflow-hidden">
          <Image
            className="object-cover object-center bg-gray-100 block mx-auto relative border-2 border-solid border-black border-opacity-10 rounded-full"
            // style={{ width: "90px", height: "90px" }}
            width="90"
            height="90"
            alt="Avatar for sytem@3xm.asia"
            src="/assets/avatar.png"
          ></Image>
          <div className="text-[18px] font-semibold mt-[15px] mb-[10px] relative align-center w-[100%] text-center break-words">
            {subscriber?.email}
          </div>
          <div className="absolute border border-[#3ea380] text-[#3ea380] hover:bg-[#3ea380] hover:text-white items-center rounded-[5px] text-[11px] leading-[11px] py-[3px] px-[6px]  top-[15px] right-[15px] h-[23px] font-medium  flex ease-out">
            {subscriber?.state}
          </div>
        </div>
        <div className="bg-white rounded-b">
          <div className="p-6 border-b border-200">
            <div>
              <div className="mb-4">
                <Label className="uppercase text-[13px] font-medium pl-0 text-left mb-[10px] tracking-wide max-w-[100%] inline-block">
                  Email address
                </Label>
                <Input
                  className="text-[#373f45]"
                  value={subscriber?.email}
                  onChange={(e) =>
                    setSubscriber((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <span className="block mt-[5px] mb-[10px]"> </span>
              </div>
              <div className="mb-4">
                <Label className="uppercase text-[13px] font-medium pl-0 text-left mb-[10px] tracking-wide max-w-[100%] inline-block">
                  First name
                </Label>
                <Input
                  className="text-[#373f45]"
                  value={subscriber?.name}
                  onChange={(e) =>
                    setSubscriber((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <span className="block mt-[5px] mb-[10px]"> </span>
              </div>
              <span>
                {/* custom  field */}
                <div className="mb-4">
                  <div className="text-[12px] font-medium">
                    + Add a new field
                  </div>
                </div>
              </span>
              <div className="">
                <Button onClick={updateSubscriber}>Update Subscriber</Button>
              </div>
            </div>
          </div>
          <div className="p-6 border-b border-gray-200">
            <p className="uppercase text-gray-700 font-semibold text-[14px] tracking-wide mb-2 leading-4">
              Tags
            </p>

            <div className="profile-tags flex flex-wrap mb-3">
              <Button className=" bg-white border border-gray-200 flex items-center justify-center text-gray-800 rounded-full h-10 w-10 hover:text-gray-800 focus:no-underline hover:no-underline hover:bg-gray-50">
                +
              </Button>
            </div>
            <div>
              <Select></Select>
            </div>
          </div>
          <div className="p-6 pt-3 pr-4 flex flex-wrap ">
            <Button variant="outline" className="text-[12px] mt-3 mr-4">
              Delete Subscriber
            </Button>
            <Button variant="outline" className="text-[12px] mt-3">
              Unsubscribe
            </Button>
          </div>
        </div>
      </div>
      {/* content box */}

      <div className="my-[30px] mx-0 p-[30px] shadow-md bg-white  ml-[30px] border border-gray-200 flex flex-1 flex-col max-w-[100%] relative ">
        <div
          role="tablist"
          id="secondary-nav-tabs"
          className=" m-[-30px] pl-0 mb-[30px] relative  border-b whitespace-no-wrap leading-[22px] lg:flex gap-6 md:pl-0 md:pr-0 order-2 lg:order-1 rounded items-end justify-center lg:justify-start overflow-x-auto lg:overflow-x-visible hide-scroll smooth-scroll secondary-tabs "
        >
          {list.map((item) => (
            <button
              role="tab"
              aria-current="true"
              aria-controls="NetNew"
              onClick={() => setActive(item.value)}
              className={`p-[15px] mr-[2px] uppercase text-[12px] tracking-wider inline-flex items-center leading-[22px] whitespace-no-wrap  font-semibold focus:outline-none border-b-2 focus-visible:bg-gray-50 hover:no-underline focus:no-underline ${
                active === item.value
                  ? " border-red-500 text-red-500 hover:text-red-600 focus:text-red-600 "
                  : "text-gray-700 hover:text-gray-800 focus:text-gray-800 border-none"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="absolute top-[100px]">
          {active === "forms" && (
            <FormBox
              id={subscriber?.id}
              topic={subscriber?.topic}
              date={subscriber?.date}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
