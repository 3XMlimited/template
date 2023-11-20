import React, { useState, useEffect } from "react";
import InputForm from "@/components/shared/InputForm";
import InputListForm from "@/components/shared/InputListForm";
import LogoForm from "@/components/shared/LogoForm";
import Tiptap from "@/components/tiptap/Tiptap";
import PopoverButton from "@/components/shared/PopoverButton";
import AlertDialogDemo from "@/components/shared/AlertDialog";
import { Separator } from "@/components/ui/separator";
import Chart from "@/components/chart.js";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash } from "lucide-react";
const Result = ({
  template,
  set_template,
  setStep,
  fetchGenerate,
  detail,
  questions,
  isLoading,
  id,
}) => {
  const [nextStep, setNextStep] = useState(false);

  async function fetchCheck() {
    if (
      template.question_for_link !== "" &&
      template.button_link !== "" &&
      template.button_name !== "" &&
      template.content !== "" &&
      template.question_content !== "" &&
      template.content !== "" &&
      template.logo !== "" &&
      template.logoBase64 !== ""
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
    <div className="space-y-6  ">
      <div>
        <h3 className="text-[40px] font-medium">Result Page</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4  max-lg:grid-cols-1  ">
        {/* LEFT */}
        <div className="space-y-6 flex-col ">
          <LogoForm
            template={template}
            set_template={set_template}
            width={300}
            height={300}
            name={"logo"}
          />
          <h1 style={{ fontSize: "2.1rem" }}>
            Congratulations on Completing the Quiz!
          </h1>
          <p>Your full report has been been generated</p>

          <div className="border p-2 rounded-md">
            <p className="font-bold">Content</p>

            <Tiptap name={"content"} value={template} setValue={set_template} />
          </div>

          {/* <div className="max-lg:w-[300px]">
            <TextAreaForm
              title={`Content`}
              name={"content"}
              value={template}
              placeholder={
                "We are thrilled that you have taken the time to complete our quiz ...."
              }
              setValue={set_template}

            />
          </div> */}
        </div>
        {/* RIGHT */}

        <Chart questions={questions} />
      </div>
      <Separator />
      {/* link  */}

      <div className=" flex-col space-y-6  w-full   ">
        <InputForm
          title={"Questions headline"}
          name={"question_for_link"}
          value={template}
          setValue={set_template}
          style={{ width: "100vh" }}
        />

        <div className="border p-2 rounded-md">
          <p className="font-bold">Question Content</p>

          <Tiptap
            name={"question_content"}
            value={template}
            setValue={set_template}
          />
        </div>
        {/* 
        <InputForm
          title={"Questions content"}
          name={"question_content"}
          value={template}
          setValue={set_template}
          style={{ width: "100vh" }}
        /> */}
      </div>
      <div className="flex justify-center mr-[40px] space-x-2 ">
        <PopoverButton
          name={template.button_name}
          value={template}
          setValue={set_template}
        />
        <div className="mt-[13px] flex  text-slate-500">
          <ArrowBigLeftDash />
          <p> Click me !</p>
        </div>
      </div>

      <div className="w-full gap-4 ">
        {template.domains.map((c, i) => (
          <div className=" space-y-6  " key={i}>
            {/* step 1 context */}
            <div className="flex w-full  flex-row space-x-2   ">
              <InputListForm
                title={`domains${i + 1}`}
                name="domains"
                value={template}
                style={{ width: "300px" }}
                index={i}
                setValue={set_template}
              />

              <InputListForm
                title={`domains url ${i + 1}`}
                name="domains_url"
                index={i}
                value={template}
                style={{ width: "500px" }}
                setValue={set_template}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end max-lg:w-screen max-lg:justify-center space-x-2 ">
        <Button
          className="w-[160px]  "
          variant={"outline"}
          onClick={() =>
            set_template((prev) => ({
              ...prev,
              domains: [...Array(6)],
              domains_url: [...Array(6)],
            }))
          }
        >
          Clear
        </Button>
        <Button
          className="w-[160px] "
          variant={"outline"}
          onClick={() =>
            set_template((prev) => ({
              ...prev,
              domains: [...template.domains, ""],
              domains_url: [...template.domains_url, ""],
            }))
          }
        >
          Add one more
        </Button>
      </div>

      <div className={`w-full  flex justify-between ${detail && "hidden"}`}>
        <Button
          className="w-[120px]"
          onClick={() => {
            setStep(2);
            window.scrollTo(0, 0);
          }}
        >
          Back
        </Button>

        <div className={`w-full  flex justify-end ${detail && "hidden"}`}>
          {nextStep ? (
            <Button
              className="w-[120px]"
              onClick={fetchGenerate}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : id ? "Update" : "Generate"}
            </Button>
          ) : (
            <AlertDialogDemo />
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
