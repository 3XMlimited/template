"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SheetRight({
  category,
  value,
  setValue,
  name,
  title,
  width,
  question,
  score,
}) {
  const [questions, setQuestions] = useState({
    question: "",
    score: 1,
  });

  useEffect(() => {
    if (question && score) {
      setQuestions({
        question,
        score,
      });
    }
  }, []);

  async function fetchChange() {
    if (category && category !== "") {
      if (question && score) {
        const updateQuestion = value[`${name}`].map((item) => {
          if (
            item.category === category &&
            item.value.question === question &&
            item.value.score === score
          ) {
            return {
              category: category,
              value: { question: questions.question, score: questions.score },
            };
          }
          return item;
        });
        setValue((prevState) => ({
          ...prevState,
          question_list: updateQuestion,
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          [`${name}`]: [
            ...value[`${name}`],
            {
              category,
              value: {
                question: questions.question
                  .replace("↵", "")
                  .split(",")
                  .toString(),
                score: questions.score,
              },
            },
          ],
        }));
      }
    }

    setQuestions({
      question: "",
      score: 1,
    });
  }

  async function fetchDelete() {
    if (category && category !== "") {
      if (question && score) {
        const updateQuestion = value[`${name}`].filter(
          (item) => item.value.question !== question
        );

        setValue((prevState) => ({
          ...prevState,
          question_list: updateQuestion,
        }));
      }
    }

    setQuestions({
      question: "",
      score: 1,
    });
  }

  const { toast } = useToast();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          disabled={category === ""}
          style={{ width: width }}
        >
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new question</SheetTitle>
          <SheetDescription>
            Make changes to your question list here. Click save when you're
            done.
          </SheetDescription>
          <Button variant="outline" className="cursor-default hover:bg-white">
            {category}
          </Button>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Question
            </Label>
            <Textarea
              id="name"
              value={questions.question}
              className="col-span-3"
              onChange={(e) =>
                setQuestions((prev) => ({ ...prev, question: e.target.value }))
              }
              //   placeholder={"Input the question "}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="score" className="text-left">
              Score
            </Label>
            <Input
              id="score"
              type="number"
              value={questions.score}
              className="col-span-3"
              placeholder="Default is 1"
              onChange={(e) =>
                setQuestions((prev) => ({
                  ...prev,
                  score: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <SheetFooter>
          {question && score && (
            <SheetClose asChild>
              <Button
                type="submit"
                className="bg-red-500"
                onClick={() => {
                  fetchDelete();
                  toast({
                    description: "Your question has been deleted.",
                  });
                }}
              >
                Delete
              </Button>
            </SheetClose>
          )}

          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => {
                toast({
                  description: "Your question has been sent.",
                });
                fetchChange();
              }}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetRight;
