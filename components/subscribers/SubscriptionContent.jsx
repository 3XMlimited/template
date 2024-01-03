"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import SubscriptionTable from "@/components/subscribers/SubscriptionTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
import { set } from "mongoose";

const SubscriptionContent = ({
  emails,
  rules,
  isLoading,
  setIsLoading,
  pageNumber,
  setPageNumber,
  pageArray,
  setPageArray,
  fetchData,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [checkDelete, setCheckDelete] = useState("");
  const [showActionList, setShowActionList] = useState(false);

  const fetchDelete = async () => {
    if (selectedIds.length > 0) {
      setIsLoading(true);
      const response = await fetch("/api/subscribers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });
      // const result = await response.json();
      await fetchData();
      setCheckDelete("");
      setIsLoading(false);
      setSelectedIds([]);

      return;
    }
  };

  const [action, setAction] = useState(null);
  const [selectedAll, setSelectedAll] = useState(false);
  useEffect(() => {
    fetchData();
  }, [pageNumber, rules]);

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

  // useEffect(() => {
  //   if (selectedAll) {
  //     setSelectedIds((prev) => [
  //       ...prev,
  //       ...emails.data.map((email) => email._id),
  //     ]);
  //   }
  //   if (selectedIds.length < emails?.data?.length) {
  //     setSelectedAll(false);
  //   }

  //   if (selectedIds.length > 0 && selectedAll === false) {
  //     // setSelectedIds([]);
  //   }
  //   // if (selectedAll && selectedIds.length < emails.data.length) {
  //   //   setSelectedAll(false);
  //   // }
  // }, [selectedIds, selectedAll]);

  console.log("select id list", selectedIds);
  console.log("action", action);
  return (
    <div className="md:order-2 lg:order-1 p-0 min-w-[1024px]">
      <div className="flex flex-col lg:flex-row lg:flex-wrap overflow-x-hidden ">
        <div className="bg-[#fff] flex flex-1 flex-col p-0 relative max-w-[100%]">
          <div className="flex flex-col flex-auto py-[20px] px-[30px] ease-in-out max-w-[100%]">
            <div className="mb-[20px] flex justify-between">
              <div className="w-[250px]   md:text-center flex flex-col gap-2 items-center md:flex-row md:justify-between">
                {/* <div className="max-w-[350px] w-[100%] h-auto text-[23px]  text-left items-center mt-4"> */}
                {/* All Subscribers
              </div> */}
                <Select className="border-none">
                  <SelectTrigger className="border-none max-w-[350px] w-[100%] h-auto text-[23px]  text-left items-center mt-4 text-gray-800">
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
              <div className="w-[120px]   md:text-center flex flex-col gap-2 items-center md:flex-row md:justify-between">
                {/* <div className="max-w-[350px] w-[100%] h-auto text-[23px]  text-left items-center mt-4"> */}
                {/* All Subscribers
              </div> */}
                <div className="flex flex-col relative">
                  <Button
                    variant="outline"
                    className=" w-[100%] h-auto text-[12px]  text-center items-center mt-4 text-gray-800"
                    onClick={() => setShowActionList((prev) => !prev)}
                    disabled={!selectedIds.length > 0}
                  >
                    Bulk Actions
                  </Button>
                  {showActionList && (
                    <div className="z-10 absolute top-[55px] left-[-100px] w-[200px] bg-white rounded-md h-[90px] border-2 border-gray-100">
                      <div
                        onClick={() => setAction("delete")}
                        className=" cursor-auto text-left py-[8px] px-[12px] hover:bg-gray-50"
                      >
                        Delete
                      </div>
                      <div className="text-left py-[8px] px-[12px] hover:bg-gray-50 cursor-not-allowed">
                        Export
                      </div>
                    </div>
                  )}
                </div>

                {/* <Select
                  disabled={!selectedIds.length > 0}
                  value={action === undefined ? undefined : action}
                  onValueChange={(e) => setAction(e)}
                >
                  <SelectTrigger className=" w-[100%] h-auto text-[12px]  text-center items-center mt-4 text-gray-800">
                    <SelectValue placeholder="Bulk Action" />
                  </SelectTrigger> */}
                {/* <SelectContent>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                  </SelectContent> */}
                {/* </Select> */}
              </div>
            </div>
          </div>

          {action === "delete" && (
            <Dialog
              defaultOpen={action === "delete"}
              onOpenChange={() => {
                setAction(undefined);
                setShowActionList(false);
              }}
            >
              <DialogTrigger className="">Delete</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-[24px]">
                    Delete Subscribers
                  </DialogTitle>

                  <DialogDescription>
                    <div className="p-6 bg-white text-black ">
                      <h3 className="text-[20px] font-bold mb-4">Whoa!</h3>
                      <p className="mb-4">
                        <strong>
                          This will permanently delete subscribers from your
                          account, including all of their subscriptions and
                          tags. This action is irreversible.
                        </strong>
                      </p>
                      <p className="mb-4">
                        If you’re sure, type “<strong>DO IT</strong>” in the box
                        below to confirm.
                      </p>
                      <Input
                        value={checkDelete}
                        onChange={(e) => setCheckDelete(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      {/* <DialogClose
                        disabled={checkDelete === "DO IT" ? false : true}
                      > */}
                      <Button
                        type="submit"
                        variant="destructive"
                        disabled={checkDelete === "DO IT" ? false : true}
                        // disabled={true}
                      >
                        <DialogClose onClick={fetchDelete}>
                          Delete Subscribers
                        </DialogClose>
                      </Button>
                      {/* </DialogClose> */}
                      <DialogClose>
                        <Button
                          type="submit"
                          variant="outline"
                          onClick={() => setAction(undefined)}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}

          <div className="flex justify-between border-t-2 border-gray-200 text-[14px]  text-gray-700 px-[30px] py-[5px] items-center ">
            {Object.keys(rules)[0] !== "date" && (
              <div className="">
                Showing subscribers with email address matching :
                <span className="font-bold">{Object.values(rules)}</span>
              </div>
            )}
            <div className="ml-1">
              Total:
              <span className="font-bold ">{emails?.totalPosts}</span>
            </div>
          </div>

          <div className="my-0  overflow-scroll h-[420px] border-t-2 border-gray-200 ">
            <div className="table w-[100%] max-w-[100%] border-collapse ">
              <table className="table w-[100%] relative ">
                <thead>
                  <tr className="table-row border-b-2 border-gray-200 ">
                    <th>
                      {/* <Checkbox
                        id={"all"}
                        checked={selectedAll}
                        onCheckedChange={(e) => setSelectedAll(e)}
                       
                      /> */}
                    </th>
                    <th className="text-left uppercase font-medium text-[#555] text-[12px] h-[30px]">
                      Subscriber
                    </th>
                    <th className="text-left uppercase font-medium text-[#555] text-[12px]">
                      Subscription date
                    </th>
                    <th className="text-left uppercase font-medium text-[#555] text-[12px]">
                      Status
                    </th>
                    <th className="text-left uppercase font-medium text-[#555] text-[12px]">
                      Location
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div className="absolute top-[200px] left-[45%] ">
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  </div>
                ) : (
                  <tbody>
                    {emails?.data?.map((email, i) => (
                      <SubscriptionTable
                        email={email}
                        index={i}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                      />
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
    </div>
  );
};

export default SubscriptionContent;
