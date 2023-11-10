"use client";
import React, { useEffect, useState } from "react";
import InputForm from "@/components/shared/InputForm";
import TextAreaForm from "@/components/shared/TextAreaForm";
import ImageForm from "@/components/shared/ImageForm";
import AlertDialogDemo from "@/components/shared/AlertDialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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

const Home = ({ template, set_template, setStep, detail }) => {
  const [open, setOpen] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [forms, setForms] = useState([]);

  const fetchConvertKit = async () => {
    const response = await fetch("/api/convertkit", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("forms", data);
    setForms(data.forms);
  };
  useEffect(() => {
    fetchConvertKit();
  }, []);

  async function fetchCheck() {
    if (
      template.content !== "" &&
      template.forms !== "" &&
      template.headline !== "" &&
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
        <div className="mt-5 flex justify-end space-x-4">
          <InputForm
            title={"Topic"}
            name={"topic"}
            placeholder={" esquiz.com/{topic} "}
            value={template}
            setValue={set_template}
          />
          {/* <FormLabel>Language</FormLabel> */}
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
                  ? forms.find((form) => form.id === Number(template.forms))
                      ?.name
                  : "Select forms"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 h-[400px] ">
              <Command>
                <CommandInput placeholder="Search forms..." />
                <CommandEmpty>No Form found.</CommandEmpty>
                <CommandGroup className="overflow-y-scroll">
                  {forms?.map((form) => (
                    <CommandItem
                      value={Number(template.forms)}
                      key={form.id}
                      onSelect={() => {
                        // console.log("form", form);
                        set_template((prev) => ({ ...prev, forms: form.id }));
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
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4  max-lg:grid-cols-1">
        {/* LEFT */}
        <div className="space-y-6">
          {/* step 1 context */}
          <div className="flex-col w-full space-y-6 ">
            <InputForm
              title={"Headline"}
              style={{ width: "600px" }}
              name={"headline"}
              placeholder={"headline"}
              value={template}
              setValue={set_template}
            />
            <div className="flex flex-col  text-[20px] text-gray-400">
              <h3 className={`   `}>Answer 'X' questions and we’ll get you </h3>
              <h3 className={`    `}>a personalised report </h3>
            </div>

            <TextAreaForm
              title={"Content"}
              name={"content"}
              value={template}
              setValue={set_template}
            />
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
