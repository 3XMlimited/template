import React from "react";
import InputForm from "@/components/shared/InputForm";
import TextAreaForm from "@/components/shared/TextAreaForm";
import ImageForm from "@/components/shared/ImageForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Home = ({ template, set_template, setStep, detail }) => {
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
          <InputForm
            title={"Form"}
            name={"forms"}
            placeholder={"ConvertKit Form name"}
            value={template}
            setValue={set_template}
          />
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
        <Button className="w-[60px] " onClick={() => setStep(2)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
