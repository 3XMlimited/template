import { useState } from "react";
import AppContext from "./Context";
import { useRouter } from "next/router";

const QuestionsState = (props) => {
  const allQuestions = [
    "Do you want to study in a country where English is the primary language spoken ?", // location
    `Is studying in a big city important to you ?`, // location
    `Do you want to study at a university with a prestigious reputation for academics ?`, // academic
    `Do you prefer universities with a wide range of academic disciplines ?`, // academic
    `Is improving your language skills a priority in your study abroad program ?`, // language
    `Are you open to studying in a country where English is not the primary language? `, //culture
    `Are you open to learning about different customs and traditions ?`, //culture
    `Are you excited about experiencing festivals and events unique to other countries ?`, //culture
    `Is cost an important factor for you when choosing a study abroad program ?`, // budget
    `Are you willing to take on part-time work to supplement your study abroad budget ?`, // budget
    `Are you open to exploring scholarship opportunities to help fund your study abroad experience ?`, // budget
    `Did you know that some Universities in Europe and the USA offer the opportunity to Study for Free ?`,
  ]; // budget

  const [answers, setAnswers] = useState(Array(allQuestions.length).fill(null));
  const [answeredCount, setAnsweredCount] = useState(0);
  const totalQuestions = allQuestions.length;
  const router = useRouter();
  const [cult, setCult] = useState(0);
  const [location, setLocation] = useState(0);
  const [academic, setAcademic] = useState(0);
  const [language, setLanguage] = useState(0);
  const [budget, setBudget] = useState(0);

  // const getAnswer = (ans) => {
  //   const updatedAnswers = [...answers];
  //   updatedAnswers[answeredCount] = ans;

  //   setAnswers(updatedAnswers);
  //   setAnsweredCount(answeredCount + 1);
  //   if(answeredCount==0 || answeredCount==1){
  //     if(answers[answeredCount]=='Yes'){
  //       setLocation(location+1)
  //     }
  //     console.log(budget)
  //   }

  //   if (answeredCount === totalQuestions - 1) {
  //    router.push('/results')
  //   }
  // };

  const getAnswer = (ans) => {
    const updatedAnswers = [...answers];
    updatedAnswers[answeredCount] = ans;
    setAnswers(updatedAnswers);
    setAnsweredCount(answeredCount + 1);

    if (answeredCount === totalQuestions - 1) {
      let updatedLocation = 0;
      let updatedAcademic = 0;
      let updatedLanguage = 0;
      let updatedBudget = 0;
      let updatedCult = 0;

      // Update values based on answers
      if (answers[0] === "Yes" && answers[1] === "Yes") {
        updatedLocation = 2;
      } else if (answers[0] === "Yes" || answers[1] === "Yes") {
        updatedLocation = 1;
      } else if (answers[0] === "No" && answers[1] === "No") {
        updatedLocation = 0;
      }

      if (answers[2] === "Yes") {
        updatedAcademic += 1;
      }
      if (answers[3] === "Yes") {
        updatedAcademic += 1;
      }
      if (answers[4] === "Yes") {
        updatedLanguage += 1;
      }
      if (answers[5] === "Yes") {
        updatedCult += 1;
      }
      if (answers[6] === "Yes") {
        updatedCult += 1;
      }
      if (answers[7] === "Yes") {
        updatedCult += 1;
      }
      if (answers[8] === "Yes") {
        updatedBudget += 1;
      }
      if (answers[9] === "Yes") {
        updatedBudget += 1;
      }
      if (answers[10] === "Yes") {
        updatedBudget += 1;
      }
      if (answers[11] === "Yes") {
        updatedBudget += 1;
      }

      // Update state variables
      setLocation(updatedLocation);
      setAcademic(updatedAcademic);
      setLanguage(updatedLanguage);
      setBudget(updatedBudget);
      setCult(updatedCult);

      // Redirect to the results page
      router.push("/results");
    }
  };

  const goBack = () => {
    if (answeredCount > 0) {
      setAnsweredCount(answeredCount - 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        answers,
        answeredCount,
        budget,
        cult,
        language,
        academic,
        location,
        setAnswers,
        setAnsweredCount,
        getAnswer,
        totalQuestions,
        goBack,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default QuestionsState;
