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
    language: "",
    pixel_id: "",
    headline: "",
    content: "",
    image: "",
    imageBase64: "",
    state: true,
  });

  // question template
  const [q_template, setQ_template] = useState({
    categories: ["", "", "", "", "", ""],
    question_list: [],
  });

  // result template
  const [r_template, setR_template] = useState({
    question_for_link: "",
    question_content: "",
    content: "",
    button_name: "Get Started",
    button_link: "",
    domains: ["", "", "", "", "", ""],
    domains_url: ["", "", "", "", "", ""],
    logo: "",
    logoBase64: "",
  });

  const fetchGenerate = async () => {
    setIsLoading(true);

    // q_template.question_list = await filterOutTheList(q_template.question_list);

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
          language: h_template.language,
          pixel_id: h_template.pixel_id,
          headline: h_template.headline,
          content: h_template.content.replace("↵", ""),
          image: h_template.imageBase64,
          categories: q_template.categories,
          scores: q_template.score,
          question_list: q_template.question_list,
          question_for_link: r_template.question_for_link,
          question_content: r_template.question_content,
          button_link: r_template.button_link,
          button_name: r_template.button_name,
          domains: r_template.domains,
          domains_url: r_template.domains_url,
          logo: r_template.logoBase64,
          thankyou_content: r_template.content,
          state: h_template.state,
        },
      }),
    });

    const data = await response.json();
    // console.log(data);
    setIsLoading(false);
    push("/");
    // redirect("/");
  };
  // console.log(
  //   "questions",
  //   q_template.categories?.filter((r) => r !== "")
  // );
  // console.log("question_list", q_template?.question_list);
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
