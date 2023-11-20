import React, { useEffect, useState } from "react";
import InputListForm from "@/components/shared/InputListForm";
import AlertDialogDemo from "@/components/shared/AlertDialog";

import SheetRight from "@/components/shared/Sheet";
import QuestionList from "@/components/shared/QuestionList";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Question = ({ template, set_template, setStep, detail }) => {
  //  control create temple state  1 / 2 / 3  2
  const [nextStep, setNextStep] = useState(false);

  // set Question List
  const [ql, setQL] = useState({});

  async function fetchCheck() {
    if (
      template.categories.filter((i) => i !== "").length > 0 &&
      template.question_list.length > 0
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

  // check input correctly

  useEffect(() => {
    setQL(Object.groupBy(template?.question_list, ({ category }) => category));
  }, [template]);

  return (
    <div className="space-y-6 relative  ">
      <div>
        <h3 className="text-[40px] font-medium">Question Page</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1 ">
        {template.categories.map((c, i) => (
          <div className="flex flex-row space-x-2" key={i}>
            <div className="flex space-x-2 w-full space-y-6 ">
              <InputListForm
                title={`category${i + 1}`}
                name="categories"
                value={template}
                index={i}
                setValue={set_template}
              />
              <SheetRight
                title="Add Question"
                width="200px"
                name="question_list"
                category={c}
                value={template}
                setValue={set_template}
              />
            </div>

            {/* <div className="space-y-6">
              <div className="flex-col space-y-6 ">
                <InputListForm
                  title="score"
                  name="score"
                  index={i}
                  value={template}
                  style={{ width: "50px" }}
                  setValue={set_template}
                />
              </div>
            </div> */}
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
              categories: [...Array(6)],
            }))
          }
        >
          Clear
        </Button>
        <Button
          className="w-[200px] "
          variant={"outline"}
          onClick={() =>
            set_template((prev) => ({
              ...prev,
              categories: [...template.categories, ""],
            }))
          }
        >
          Add new category
        </Button>
      </div>
      {/* <div>
        <>
          {template.categories.map(
            (c, i) =>
              c !== "" && (
                <div className="flex-col " key={i}>
                  <h3 className="text-[30px] text-[#131313]  m-4 bg-slate-50 w-[200px] flex justify-center rounded-xl border">
                    {c}
                  </h3>
                 

                  <TextAreaForm
                    title={"Question List"}
                    placeholder={"Question will split by ',' "}
                    name={"question_list"}
                    value={template}
                    setValue={set_template}
                    category={c}
                  />
                </div>
              )
          )}
        </>
      </div> */}
      <Separator />
      {Object.keys(ql)?.map((q) => (
        <QuestionList
          category={q}
          list={ql}
          template={template}
          set_template={set_template}
        />
      ))}
      <div className={`w-full  flex justify-between ${detail && "hidden"}  `}>
        <Button
          className="w-[120px] "
          onClick={() => {
            setStep(1);
          }}
        >
          Back
        </Button>

        {nextStep ? (
          <Button
            className="w-[120px]"
            onClick={() => {
              setStep(3);
              window.scrollTo(0, 0);
            }}
          >
            Next
          </Button>
        ) : (
          <AlertDialogDemo className="w-[120px] " />
        )}

        {/* <Button
          className="w-[120px] "
          onClick={() => {
            setStep(3);
            window.scrollTo(0, 0);
          }}
        >
          Next
        </Button> */}
      </div>
    </div>
  );
};

export default Question;
