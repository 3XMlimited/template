"use client";
import React, { useState, useEffect } from "react";
import { XCircle, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Home from "@/components/template/home";
import Question from "@/components/template/question";
import Result from "@/components/template/result";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { filterOutTheList } from "@/utils/utils";
const page = () => {
  const { push } = useRouter();
  const id = usePathname().split("/")[1];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // home template
  const [h_template, setH_template] = useState({
    topic: "",
    forms: "",
    headline: "",
    content: "",
    image: "",
    imageBase64: "",
  });

  // question template
  const [q_template, setQ_template] = useState({
    categories: ["", "", "", "", "", ""],
    score: [1, 1, 1, 1, 1, 1],
    question_list: [],
  });

  // result template
  const [r_template, setR_template] = useState({
    question_for_link: "",
    button_link: "",
    content: "",
    domains: [],
    image: "",
    imageBase64: "",
    content: "",
  });

  async function fetchData() {
    setIsLoading(true);
    const response = await fetch(`/api/get`, {
      method: "POST",
      timeout: "30000",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const result = await response.json();
    console.log(result);
    setData(result);

    // setIsLoading(false);
  }

  console.log(isLoading);
  useEffect(() => {
    fetchData();
    // setIsLoading(false);
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      setH_template({
        topic: data[0].topic,
        forms: data[0].forms,
        headline: data[0].headline,
        content: data[0].content,
        image: data[0].image,
        imageBase64: data[0].image,
      });

      setQ_template({
        categories: data[0].categories,
        score: data[0].scores,
        question_list: data[0].question_list,
      });

      setR_template({
        question_for_link: data[0].question_for_link,
        button_link: data[0].button_link,
        domains: data[0].domains,
        image: data[0].logo,
        imageBase64: data[0].logo,
        content: data[0].thankyou_content,
      });
      setIsLoading(false);
    }
  }, [data]);

  const fetchGenerate = async () => {
    q_template.question_list = await filterOutTheList(q_template.question_list);
    console.log(h_template);
    console.log(q_template);
    console.log(r_template);

    const response = await fetch("/api/new", {
      method: "PATCH",
      timeout: "30000",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          topic: h_template.topic,
          forms: h_template.forms,
          headline: h_template.headline,
          content: h_template.content.toString().replace("↵", ""),
          image: h_template.imageBase64,
          categories: q_template.categories,
          scores: q_template.score,
          question_list: q_template.question_list,
          question_for_link: r_template.question_for_link,
          button_link: r_template.button_link,
          domains: r_template.domains.toString().replace("↵", "").split(","),
          logo: r_template.imageBase64,
          state: true,
          thankyou_content: r_template.content,
          id,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    push("/");
  };

  return (
    <>
      {isLoading ? (
        <div className="relative top-[300px] left-[40%]">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      ) : (
        // <Progress value={33} />
        <div className="flex-col space-y-6">
          <Button className="">
            <Link href="/"> {"<-Back"}</Link>
          </Button>
          <Home
            template={h_template}
            set_template={setH_template}
            detail={true}
          />

          <Question
            template={q_template}
            set_template={setQ_template}
            detail={true}
          />

          <Result
            template={r_template}
            set_template={setR_template}
            fetchGenerate={fetchGenerate}
            detail={true}
            questions={q_template}
          />
        </div>
      )}
    </>
  );
};

export default page;
// Do you want to study in a country where English is the primary language spoken ?,
// Is studying in a big city important to you ?,
// Do you want to study at a university with a prestigious reputation for academics ?,
// Do you prefer universities with a wide range of academic disciplines ?,
// Is improving your language skills a priority in your study abroad program ?,
// Are you open to studying in a country where English is not the primary language? ,
// Are you open to learning about different customs and traditions ?,
// Are you excited about experiencing festivals and events unique to other countries ?,
// Is cost an important factor for you when choosing a study abroad program ?,
// Are you willing to take on part-time work to supplement your study abroad budget ?,
// Are you open to exploring scholarship opportunities to help fund your study abroad experience ?,
// Did you know that some Universities in Europe and the USA offer the opportunity to Study for Free ?,
