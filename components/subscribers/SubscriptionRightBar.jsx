"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import moment from "moment";
const SubscriptionRightBar = ({ setEmails, setRules, fetchData }) => {
  // export csv
  const [name, setName] = useState("");
  // add emails action //[ "" / "add" / "import"]
  const [addAction, setAddAction] = useState("");
  // show form label state
  const [showFormLabel, setShowFormLabel] = useState(false);

  // total forms array
  const [forms, setForms] = useState([]);

  // selected forms count
  const [selectedForms, setSelectedForms] = useState([]);

  // add new subscribers
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
  });

  const fetchSearchByName = async () => {
    if (date.to === undefined) {
      date.to = date.from;
    }
    const rules = { name };
    const response = await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rules,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    setRules(rules);
    setEmails(data);
  };
  const fetchFormList = async () => {
    const response = await fetch("/api/form", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setForms(data);
  };
  // add new subscription
  const fetchSave = async () => {
    if (
      newSubscriber.name !== "" &&
      newSubscriber.email !== "" &&
      selectedForms.length > 0
    ) {
      const response = await fetch("api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forms: selectedForms,
          name: newSubscriber.name,
          email: newSubscriber.email,
        }),
      });
      const result = await response.json();
      await fetchData();
      //   setRules({ date: moment().format("YYYY-MM-DD") });
    }
  };
  useEffect(() => {
    fetchFormList();
  }, []);
  return (
    <div className="bg-gray-100 md:order-1 lg:order-2 ml-[9px] px-[21px]  pt-6 pb-6 md:pb-0 lg:max-w-sm">
      <section>
        <div className="flex mb-6  mt-0">
          <Input
            placeholder="Search subscribers"
            className="mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant={"outline"} onClick={fetchSearchByName}>
            Search
          </Button>
        </div>
      </section>
      <section className="border-t-2 border-gray-200 mx-[-21px] py-[25px] px-[25px] space-y-6">
        <div>
          {/* <Button className="w-[100%] flex font-semibold  justify-center py-[26px] px-[40px]  text-[18px]">
            Add Subscribers
          </Button> */}
          <Dialog>
            <DialogTrigger className="bg-[rgb(62,163,128)] w-[100%] flex font-semibold  justify-center py-[14px] px-[40px]  text-[18px] rounded-md text-white">
              Add Subscribers
            </DialogTrigger>
            <DialogContent>
              {addAction === "add" && (
                <DialogHeader>
                  <DialogTitle className="text-[24px]">
                    Add Subscribers
                  </DialogTitle>

                  <DialogDescription>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-7 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newSubscriber.name}
                          placeholder="Peter Chan"
                          onChange={(e) =>
                            setNewSubscriber((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="col-span-6"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center gap-4">
                        <Label htmlFor="email" className="text-left">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={newSubscriber.email}
                          placeholder="peter2024@3xm.asia"
                          onChange={(e) =>
                            setNewSubscriber((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="col-span-6"
                        />
                      </div>
                      <div className="grid grid-cols-8 items-center gap-4  ">
                        {/* <div className="col-span-1"></div> */}
                        <div className="col-span-8 border-2 border-gray-200 rounded-md h-full ">
                          {/* title */}
                          <div className=" flex justify-between p-2 border-b-2 text-[16px]">
                            <p className="text-cyan-900">
                              Include these subscribers
                            </p>
                            <p className="text-gray-400 italic">
                              {selectedForms.length | "No"} sources selected
                            </p>
                          </div>
                          <div className=" bg-[#ddd] text-[12px]">
                            <div
                              className="text-cyan-800 p-2 cursor-pointer"
                              onClick={() => setShowFormLabel((prev) => !prev)}
                            >
                              Forms
                              <span className="ml-2  text-gray-400 italic">
                                {selectedForms.length | 0} of {forms.length | 0}{" "}
                                selected
                              </span>{" "}
                            </div>
                            {showFormLabel && (
                              <div className=" bg-white ">
                                {forms?.map((form) => (
                                  <div
                                    className="flex items-center space-x-2 ml-4 py-1 border-y border-gray-100 "
                                    htmlFor={form._id}
                                  >
                                    <Checkbox
                                      id={form._id}
                                      checked={selectedForms
                                        .map((f) => f.id)
                                        .includes(form._id)}
                                      onCheckedChange={(e) =>
                                        e
                                          ? setSelectedForms((prev) => [
                                              ...prev,
                                              { form: form.name, id: form._id },
                                            ])
                                          : setSelectedForms((prev) =>
                                              prev.filter(
                                                (r) => r.id !== form._id
                                              )
                                            )
                                      }
                                    />
                                    <label
                                      htmlFor={form._id}
                                      className="text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {form.name}
                                    </label>
                                    {/* <label className="text-gray-400 italic">
                                      No subscribers
                                    </label> */}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant={"outline"}
                        onClick={() => setAddAction("")}
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        onClick={fetchSave}
                        disabled={
                          !(
                            newSubscriber.name !== "" &&
                            newSubscriber.email !== "" &&
                            selectedForms.length > 0
                          )
                        }
                      >
                        <DialogClose>Save changes</DialogClose>
                      </Button>
                    </DialogFooter>
                  </DialogDescription>
                </DialogHeader>
              )}
              {addAction === "" && (
                <DialogHeader>
                  <DialogTitle className="text-[24px]">
                    Import Subscribers
                  </DialogTitle>

                  <DialogDescription>
                    <div className="grid grid-cols-2 gap-4 ng-scope">
                      <button
                        className="flex flex-col items-center justify-center py-8 px-4 rounded-sm bg-gray-50 hover:bg-gray-100 text-sm font-semibold transition transform duration-100 hover:scale-105"
                        ng-click="edit('subscribers')"
                        onClick={() => setAddAction("add")}
                      >
                        <svg
                          className="w-8 h-8 mb-2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M15.514 4.654a5.1 5.1 0 0 0-7.028 0c-2.044 1.923-1.875 5.102-.032 7.06 1.923 2.044 5.102 1.875 7.06.032 2.024-1.905 2-5.093.016-7.076a.658.658 0 0 0-.016-.016zm-6 1.092a3.6 3.6 0 0 1 4.964-.008c1.408 1.417 1.382 3.623.008 4.916-1.442 1.357-3.663 1.388-4.94.032-1.357-1.442-1.388-3.663-.032-4.94z"
                            clip-rule="evenodd"
                          ></path>
                          <path d="M5.741 20A3.633 3.633 0 0 1 9.4 16.341h5.1A3.633 3.633 0 0 1 18.159 20a.741.741 0 1 0 1.482 0c0-2.798-2.22-5.141-5.141-5.141H9.4c-2.798 0-5.141 2.22-5.141 5.141a.741.741 0 1 0 1.482 0z"></path>
                        </svg>
                        Add a single subscriber
                      </button>
                      <button
                        className="flex flex-col items-center justify-center py-8 px-4 rounded-sm bg-gray-50 hover:bg-gray-100 text-sm font-semibold transition transform duration-100 hover:scale-105"
                        ng-click="edit('import')"
                        onClick={() => setAddAction("import")}
                      >
                        <svg
                          className="w-8 h-8 mb-2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9.267 5.382a3.865 3.865 0 1 1 5.466 5.466 3.865 3.865 0 0 1-5.466-5.466zm1.06 1.06a2.365 2.365 0 1 1 3.345 3.346 2.365 2.365 0 0 1-3.344-3.345zm10.996 2.551a2.773 2.773 0 1 0-3.922 3.922 2.773 2.773 0 0 0 3.922-3.922zm-2.861 1.06a1.273 1.273 0 1 1 1.8 1.801 1.273 1.273 0 0 1-1.8-1.8zM2.677 8.993A2.773 2.773 0 1 1 6.6 12.915a2.773 2.773 0 0 1-3.922-3.922zm2.861 1.06a1.273 1.273 0 1 0-1.8 1.801 1.273 1.273 0 0 0 1.8-1.8z"
                            clip-rule="evenodd"
                          ></path>
                          <path d="M19.699 14.654a.75.75 0 0 0 0 1.5h.801c.967 0 1.75.783 1.75 1.75V19a.75.75 0 0 0 1.5 0v-1.096a3.25 3.25 0 0 0-3.25-3.25h-.801zM3.5 16.154a1.75 1.75 0 0 0-1.75 1.75V19a.75.75 0 0 1-1.5 0v-1.096a3.25 3.25 0 0 1 3.25-3.25h.801a.75.75 0 0 1 0 1.5H3.5zm6.66-3.005a4.25 4.25 0 0 0-4.25 4.25V19a.75.75 0 0 0 1.5 0v-1.601a2.75 2.75 0 0 1 2.75-2.75h3.679a2.75 2.75 0 0 1 2.75 2.75V19a.75.75 0 0 0 1.5 0v-1.601a4.25 4.25 0 0 0-4.25-4.25H10.16z"></path>
                        </svg>
                        Import a CSV
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="w-[100%] flex font-semibold  justify-center py-[26px]   px-[40px]  text-[13px]"
          >
            Manage Subscriber Preferences
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionRightBar;
