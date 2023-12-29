"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import SubscriptionTable from "@/components/subscribers/SubscriptionTable";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubscriptionContent = () => {
  const [emails, setEmails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageArray, setPageArray] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rules: { date: "2023-12-29" },
        pageNumber: pageNumber,
      }),
    });
    const result = await response.json();
    setEmails(result.data);
    setIsLoading(false);
    return;
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber === pageArray[pageArray.length - 1]) {
      let array = pageArray;
      array = array.slice(1, array.length);
      array.push(pageNumber + 1);
      setPageArray(array);
    }
    if (pageNumber === pageArray[0] && pageNumber !== 1) {
      let array = pageArray;
      array = array.slice(0, array.length - 1);
      array = [pageNumber - 1, ...array];
      setPageArray(array);
    }
  });

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap overflow-x-hidden ">
      <div className="bg-[#fff] flex flex-1 flex-col p-0 relative max-w-[100%]">
        <div className="flex flex-col flex-auto py-[20px] px-[30px] ease-in-out max-w-[100%]">
          <div className="mb-[20px] flex justify-between">
            <div className="w-full   md:text-center flex flex-col gap-2 items-center md:flex-row md:justify-between">
              {/* <div className="max-w-[350px] w-[100%] h-auto text-[23px]  text-left items-center mt-4"> */}
              {/* All Subscribers
              </div> */}
              <Select>
                <SelectTrigger className="max-w-[350px] w-[100%] h-auto text-[23px]  text-left items-center mt-4 text-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">
                    Confirmed Subscribers
                  </SelectItem>
                  <SelectItem defaultValue="all"> All Subscribers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="my-0  overflow-scroll h-[600px] border-t-2 border-gray-200">
          <div className="table w-[100%] max-w-[100%] border-collapse ">
            <table className="table w-[100%] relative  ">
              <thead>
                <tr className="table-row border-b-2 border-gray-200  ">
                  <th></th>
                  <th className="text-left">Subscriber</th>
                  <th className="text-left">Subscription date</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Location</th>
                </tr>
              </thead>
              {isLoading ? (
                <div className="absolute top-[300px] left-[45%] ">
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                </div>
              ) : (
                <tbody>
                  {emails.map((email, i) => (
                    <SubscriptionTable email={email} index={i} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  pageNumber > 1 && setPageNumber((prev) => prev - 1)
                }
              />
            </PaginationItem>
            {pageArray.map((index) => (
              <PaginationItem>
                <PaginationLink
                  value={index}
                  isActive={pageNumber === index}
                  onClick={() => setPageNumber(index)}
                >
                  {index}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPageNumber((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default SubscriptionContent;
