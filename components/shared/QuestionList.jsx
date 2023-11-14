import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Pencil, Delete, CheckSquare } from "lucide-react";
import SheetRight from "@/components/shared/Sheet";
function QuestionList({ category, list, template, set_template }) {
  const [edit, setEdit] = useState(false);

  const fetchSave = () => {
    setEdit(false);
  };

  const fetchDelete = () => {
    setEdit(false);
  };
  console.log(list);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[30px] uppercase">
          {category}
        </AccordionTrigger>
        {list[`${category}`].map((l) => (
          <div className="w-full flex justify-between px-[20px]">
            <AccordionContent>
              <p className="mt-2">{l.value.question}</p>
            </AccordionContent>

            <AccordionContent>
              <div className="flex flex-row space-x-4">
                <div className="w-[40px] bg-gray-200 text-center items-center  rounded-md font-bold">
                  <p className="items-center mt-2">{l.value.score}</p>
                </div>
                {edit ? (
                  <>
                    <CheckSquare
                      className="text-purple-500"
                      onClick={fetchSave}
                    />
                    <Delete className="text-red-500" onClick={fetchDelete} />
                  </>
                ) : (
                  <SheetRight
                    title="Edit"
                    width="100px"
                    name="question_list"
                    category={category}
                    value={template}
                    setValue={set_template}
                    question={l.value.question}
                    score={l.value.score}
                  />
                  //   <Pencil
                  //     className="text-purple-500"
                  //     onClick={() => setEdit(true)}
                  //   />
                )}
              </div>
            </AccordionContent>
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
export default QuestionList;
