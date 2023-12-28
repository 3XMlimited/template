"use client";
import React, { useEffect, useState } from "react";
import FormBox from "@/components/forms/FormBox";
import FormChart from "@/components/forms/FormChart";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const page = () => {
  const [newForm, setNewForm] = useState({
    name: "",
    type: "embed",
    url: "",
    title: "Join the newsletter",
    description: "Form description text.",
    sign_up_button_text: "Subscribe",
    success_message:
      "Success! Now check your email to confirm your subscription.",
    custom_fields: [],
  });
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(false);
  const [sum, setSum] = useState({
    today: 0,
    day7: 0,
    day30: 0,
    total: 0,
  });

  const fetchCreateForm = async () => {
    setIsLoading(true);
    console.log(newForm);
    const response = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: newForm }),
    });
    const result = await response.json();
    await fetchForms();
    console.log(result);
    setIsLoading(false);
  };

  const handleEditCustomField = (index, newValue) => {
    const updatedForm = { ...newForm };
    const updatedCustomFields = [...updatedForm.custom_fields];
    updatedCustomFields[index] = newValue;
    updatedForm.custom_fields = updatedCustomFields;
    setNewForm(updatedForm);
  };

  const fetchForms = async () => {
    setIsLoading(true);

    const response = await fetch("/api/form", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setForms(result);
    // console.log(result);
    setIsLoading(false);
    setState(false);
  };

  useEffect(() => {
    fetchForms();
  }, [state]);
  return (
    <main className="container relative">
      <FormChart sum={sum} />
      {/* title */}
      <div className="relative border-b border-gray-200 bg-white mb-6">
        <div className="flex justify-between mx-auto px-8 lg:h-20 flex-col lg:flex-row pt-8 pb-5">
          <h2 className="flex-grow text-[24px] leading-8 font-semibold text-center md:text-left mb-4 lg:mb-0">
            Landing Pages & Forms
          </h2>
          {}
          <div className="flex lg:items-center gap-1 md:gap-2 flex-col md:flex-row">
            <div className="flex items-center flex-wrap gap-2">
              <div>
                <span className="mr-2 text-gray-700 font-semibold">
                  Sort by
                </span>
                {/* <span style={{"border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap; "overflow-wrap":"normal"}}>
                <label
                  id="downshift-0-label"
                  for="downshift-0-toggle-button"
                ></label>
              </span> */}

                <button className="inline-flex items-center leading-tight border border-gray-200 text-sm gap-2 rounded pr-2 pl-4 py-2 leading-5 bg-white h-10 hover:bg-gray-50 focus:outline-none focus-visible:border-blue-500">
                  <span className="flex-grow text-left truncate">Newest</span>
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

              <Dialog>
                <DialogTrigger className="bg-primary-500 text-white hover:bg-primary-600 focus-visible:bg-primary-600 hover:text-white focus:text-white inline-flex whitespace-no-wrap items-center gap-2 py-2 pr-4 pl-2 rounded font-semibold hover:no-underline focus:no-underline focus:outline-none w-full md:w-auto justify-center md:justify-start">
                  <svg
                    className="fill-current inline-block overflow-visible w-6 h-6"
                    name="plus"
                    viewBox="0 0 24 24"
                    style={{ fontSize: "inherit" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M6.343 11.25a.75.75 0 0 0 0 1.5h4.907v4.907a.75.75 0 1 0 1.5 0V12.75h4.907a.75.75 0 1 0 0-1.5H12.75V6.343a.75.75 0 0 0-1.5 0v4.907H6.343z"></path>
                  </svg>
                  <span aria-hidden="true">Create new</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      <svg
                        className="fill-current inline-block overflow-visible w-6 h-6 mr-2"
                        name="form"
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
                          d="M4 2.25A2.75 2.75 0 0 0 1.25 5v14A2.75 2.75 0 0 0 4 21.75h5a.75.75 0 0 0 0-1.5H4c-.69 0-1.25-.56-1.25-1.25V8.75h18.5V11a.75.75 0 0 0 1.5 0V5A2.75 2.75 0 0 0 20 2.25H4zm17.25 5H2.75V5c0-.69.56-1.25 1.25-1.25h16c.69 0 1.25.56 1.25 1.25v2.25z"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          d="M20.651 12.617a1.749 1.749 0 0 0-2.475 0l-5.56 5.56a1.749 1.749 0 0 0-.512 1.237V22c0 .414.336.75.75.75h2.586c.464 0 .909-.184 1.237-.513l5.56-5.56a1.75 1.75 0 0 0 0-2.475l-1.586-1.585zm-1.413 1.06a.249.249 0 0 1 .353 0l1.586 1.587a.249.249 0 0 1 0 .353l-5.56 5.56a.25.25 0 0 1-.177.073h-1.836v-1.836a.25.25 0 0 1 .073-.177l5.561-5.56z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Form
                    </DialogTitle>
                    <DialogDescription>
                      You can embed a form anywhere on your website, sales page,
                      or landing page that you host yourself.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-left col-span-2">
                        Form Name
                      </Label>
                      <Input
                        id="name"
                        value={newForm.name}
                        className="col-span-3"
                        onChange={(e) =>
                          setNewForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex space-between items-center forms-custom-fields__add">
                      <div className="flex-auto block border-t border-gray-300"></div>
                      <Button
                        onClick={() =>
                          setNewForm((prev) => ({
                            ...prev,
                            custom_fields: [...prev.custom_fields, ""],
                          }))
                        }
                      >
                        Add
                      </Button>
                      <div className="flex-auto block border-t border-gray-300"></div>
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label
                        htmlFor="username"
                        className="text-left col-span-2"
                      >
                        Custom Field
                      </Label>
                      <Input
                        id="username"
                        disabled={true}
                        defaultValue="email"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label
                        htmlFor="username"
                        className="text-left col-span-2"
                      >
                        Custom Field
                      </Label>
                      <Input
                        id="username"
                        disabled={true}
                        defaultValue="username"
                        className="col-span-3"
                      />
                    </div>

                    {newForm.custom_fields?.map((a, i) => (
                      <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-2">
                          Custom Field
                        </Label>
                        <Input
                          id=""
                          className="col-span-3"
                          value={newForm.custom_fields[i]}
                          onChange={(e) =>
                            handleEditCustomField(i, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <DialogClose>
                    <Button type="submit" onClick={fetchCreateForm}>
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      {/* forms */}
      {isLoading && (
        <div className="bg-red-600 absolute left-[40%] top-[60%] p-5 rounded-md text-white opacity-80">
          Loading...
        </div>
      )}
      <div className="container">
        <div className="flex flex-col md:grid gap-4 md:grid-cols-3">
          {forms.map((form, i) => (
            <FormBox
              form={form}
              setState={setState}
              setIsLoading={setIsLoading}
              key={i}
              index={i}
              setSum={setSum}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
