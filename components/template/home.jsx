"use client";
import React, { useEffect, useState } from "react";
import InputForm from "@/components/shared/InputForm";
import ImageForm from "@/components/shared/ImageForm";
import AlertDialogDemo from "@/components/shared/AlertDialog";
import { Separator } from "@/components/ui/separator";
import Tiptap from "@/components/tiptap/Tiptap";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home = ({ template, set_template, setStep, detail }) => {
  // select form  picker state
  const [open, setOpen] = useState(false);

  // save form id
  const [forms, setForms] = useState([]);

  // picker or input  default ：form picker -- if can‘t find the form can input form id mainly
  const [changeInput, setChangeInput] = useState(false);

  //  control create temple state  1 / 2 / 3 default：1
  const [nextStep, setNextStep] = useState(false);

  //FUNCTION: Get Convertkit form ID
  const fetchForms = async () => {
    const response = await fetch("/api/emailOctopus/list", {
      method: "GET",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("data", data);
    // console.log("forms", data);
    setForms(data);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // check input correctly
  async function fetchCheck() {
    if (
      template.content !== "" &&
      template.forms !== "" &&
      template.language !== "" &&
      template.headline !== "" &&
      template.pixel_id !== "" &&
      template.image !== "" &&
      template.imageBase64 !== "" &&
      template.topic !== ""
    ) {
      setNextStep(true);
      // setStep(2);
    } else {
      setNextStep(false);
    }
  }
  useEffect(() => {
    fetchCheck();
  }, [template]);

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-2 max-lg:grid-cols-1">
        <div>
          <h3 className="text-[40px] font-medium">Home Page</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <div className=" flex justify-end space-x-4">
          <InputForm
            title={"Pathname"}
            name={"topic"}
            placeholder={"{topic}"}
            value={template}
            setValue={set_template}
            className="items-start"
          />

          {/* <FormLabel>Language</FormLabel> */}
          {/* {changeInput ? (
            <InputForm
              title={"Form"}
              name={"forms"}
              placeholder={"Forms ID"}
              value={template}
              setValue={set_template}
              className="items-start"
            />
          ) : ( */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={`
                    w-[400px] justify-between  mt-[50px]
                   ${!template.forms && "text-muted-foreground"}
                  `}
              >
                {template.forms
                  ? forms.find((form) => form.id === template.forms)?.name
                  : "Select forms"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 h-[400px] ">
              <Command>
                <CommandInput placeholder="Search forms..." />
                <CommandEmpty>No Form found.</CommandEmpty>
                <CommandGroup className="overflow-y-scroll">
                  {forms?.map((form, i) => (
                    <CommandItem
                      // value={template.forms}
                      key={form.id}
                      onSelect={() => {
                        // console.log("form", form);
                        set_template((prev) => ({
                          ...prev,
                          forms: form.id,
                        }));
                        // form.setValue("form", form.id);
                      }}
                    >
                      {form.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {/* )} */}

          {/* <FormDescription>
            This is the language that will be used in the dashboard.
          </FormDescription>
          <FormMessage /> */}

          {/* <InputForm
            title={"Form"}
            name={"forms"}
            placeholder={"ConvertKit Form name"}
            value={template}
            setValue={set_template}
          /> */}
        </div>
        {/* <div className=" col-span-2 flex justify-end text-right ">
          <Button
            variant={"none"}
            className="text-indigo-500 italic"
            onClick={() => setChangeInput((prev) => !prev)}
          >
            {changeInput ? "Search by name" : "Can't not find?"}
          </Button>
        </div> */}
        <div className=" mt-5 col-span-2 flex justify-between">
          <div className="space-y-4 ">
            <div className="space-y-0.5 space-x-8 grid grid-cols-2 max-lg:grid-cols-1 w-full mt-8 border border-gray-500 rounded-lg py-4 pl-2">
              <h1 className="text-[20px]">Control display</h1>
              <Switch
                checked={template.state}
                onCheckedChange={(e) => {
                  set_template((prev) => ({ ...prev, state: e }));
                }}
              />
            </div>
          </div>
          <div className="flex space-x-4 h-full items-end">
            <Select
              className="mt-20"
              value={template?.language}
              onValueChange={(e) => {
                set_template((prev) => ({ ...prev, language: e }));
              }}
            >
              <SelectTrigger className="w-[240px] mt-7">
                <SelectValue
                  placeholder="Language"
                  value={template?.language}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>

            <InputForm
              title={"Pixel ID"}
              name={"pixel_id"}
              placeholder={"Facebook Pixel ID "}
              value={template}
              setValue={set_template}
              style={{ width: "w-[700px]" }}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4  max-lg:grid-cols-1">
        {/* LEFT */}
        <div className="space-y-6">
          {/* step 1 context */}
          <div className="flex-col w-full space-y-6 ">
            {/* <InputForm
              title={"Headline"}
              style={{ width: "600px" }}
              name={"headline"}
              placeholder={"headline"}
              value={template}
              setValue={set_template}
            /> */}
            <div className="border p-2 rounded-md">
              <p className="font-bold">Headline</p>

              <Tiptap
                name={"headline"}
                value={template}
                setValue={set_template}
              />
            </div>

            <div className="flex flex-col  text-[20px] text-gray-400">
              <h3 className={`   `}>Answer 'X' questions and we’ll get you </h3>
              <h3 className={`    `}>a personalised report </h3>
            </div>
            <div className="border p-2 rounded-md">
              <p className="font-bold">Content</p>

              <Tiptap
                name={"content"}
                value={template}
                setValue={set_template}
              />
            </div>

            {/* <TextAreaForm
              title={"Content"}
              name={"content"}
              value={template}
              setValue={set_template}
            /> */}
            <Button className="h-16 bg-[#49C1F0] cursor-not-allowed hover:bg-[#49C1F0]">
              <div className="flex-col">
                <p>Take The Scorecard</p>
                <p>(It only takes 1 minute)</p>
              </div>
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 flex justify-end">
          <ImageForm
            template={template}
            set_template={set_template}
            width={500}
            height={500}
            name={"image"}
          />
        </div>
      </div>
      <div className={`w-full  flex justify-end ${detail && "hidden"}`}>
        {nextStep ? (
          <Button className="w-[120px] " onClick={() => setStep(2)}>
            Next
          </Button>
        ) : (
          <AlertDialogDemo />
        )}
      </div>
    </div>
  );
};

export default Home;
