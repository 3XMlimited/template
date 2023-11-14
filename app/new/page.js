"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Home from "@/components/template/home";
import Question from "@/components/template/question";
import Result from "@/components/template/result";
import { filterOutTheList } from "@/utils/utils";
const page = () => {
  const { push } = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // home template
  const [h_template, setH_template] = useState({
    topic: "",
    forms: "",
    pixel_id: "",
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
    content: "",
    button_link: "",
    domains: ["", "", "", "", "", ""],
    domains_url: ["", "", "", "", "", ""],
    logo: "",
    logoBase64: "",
  });

  const fetchGenerate = async () => {
    setIsLoading(true);
    console.log(h_template);
    q_template.question_list = await filterOutTheList(q_template.question_list);
    console.log(q_template);

    console.log(r_template);
    const response = await fetch("/api/new", {
      method: "POST",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          topic: h_template.topic,
          forms: h_template.forms,
          pixel_id: h_template.pixel_id,
          headline: h_template.headline,
          content: h_template.content.replace("↵", ""),
          image: h_template.imageBase64,
          categories: q_template.categories,
          scores: q_template.score,
          question_list: q_template.question_list,
          question_for_link: r_template.question_for_link,
          button_link: r_template.button_link,
          domains: r_template.domains,
          domains_url: r_template.domains_url,
          logo: r_template.logoBase64,
          thankyou_content: r_template.content,
          state: true,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    push("/");
    // redirect("/");
  };
  console.log(
    "questions",
    q_template.categories?.filter((r) => r !== "")
  );
  console.log("question_list", q_template?.question_list);
  return (
    <div className="flex-col">
      {/* Step 1: */}
      {step === 1 && (
        <Home
          template={h_template}
          set_template={setH_template}
          setStep={setStep}
        />
      )}

      {/* Step 2: */}

      {step === 2 && (
        <Question
          template={q_template}
          set_template={setQ_template}
          setStep={setStep}
        />
      )}

      {/* Step 3: */}

      {step === 3 && (
        <Result
          template={r_template}
          set_template={setR_template}
          setStep={setStep}
          fetchGenerate={fetchGenerate}
          questions={q_template}
          isLoading={isLoading}
        />
      )}
    </div>
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
