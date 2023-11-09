import React from "react";
import InputForm from "@/components/shared/InputForm";
import ImageForm from "@/components/shared/ImageForm";
import TextAreaForm from "@/components/shared/TextAreaForm";

import { Separator } from "@/components/ui/separator";
import Chart from "@/components/chart.js";
import { Button } from "@/components/ui/button";
const Result = ({
  template,
  set_template,
  setStep,
  fetchGenerate,
  detail,
  questions,
  isLoading,
}) => {
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
          <ImageForm
            template={template}
            set_template={set_template}
            width={200}
            height={200}
          />
          <h1 style={{ fontSize: "2.1rem" }}>
            Congratulations on Completing the Quiz!
          </h1>
          <p>Your full report has been been generated</p>
          <div className="max-lg:w-[300px]">
            <TextAreaForm
              title={`Content`}
              name={"content"}
              value={template}
              placeholder={
                "We are thrilled that you have taken the time to complete our quiz ...."
              }
              setValue={set_template}
            />
          </div>
        </div>
        {/* RIGHT */}

        <Chart questions={questions} />
      </div>
      <Separator />
      {/* link  */}
      <div className=" space-y-6 ">
        <div className="w-full ">
          <div className=" flex-col space-y-6   max-lg:w-[300px] ">
            <InputForm
              title={"Questions for link"}
              name={"question_for_link"}
              value={template}
              setValue={set_template}
              style={{ width: "100vh" }}
            />
            <InputForm
              title={"Button link"}
              name={"button_link"}
              placeholder={"Button link"}
              style={{ backgroundColor: "rgb(73,193,240)", width: "100vh" }}
              value={template}
              setValue={set_template}
            />
            <div className="max-lg:w-[300px]">
              <TextAreaForm
                title={`Domain List`}
                name={"domains"}
                value={template}
                placeholder={"Domain will split by ',' "}
                setValue={set_template}
              />
            </div>
          </div>
        </div>
      </div>
      {detail ? (
        <div className={`w-full  flex justify-end `}>
          <Button className="w-[120px]" onClick={fetchGenerate}>
            Update
          </Button>
        </div>
      ) : (
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
          <Button
            className="w-[120px]"
            onClick={fetchGenerate}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Result;
