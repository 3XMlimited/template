"use server";
import moment from "moment";
import { connectToDB } from "@/utils/database";
import Emails from "@/models/email";
import Results from "@/models/result";
import FormChart from "@/components/forms/FormChart";

export const FormsTotal = async ({}) => {
  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(moment(dt).format("YYYY-MM-DD"));
    }
    // console.log(arr);
    return arr;
  };

  await connectToDB();
  let forms = await Emails.find({});

  let days7Array = getDaysArray(
    moment().subtract(6, "days"),
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  let days30Array = getDaysArray(
    moment().subtract(30, "days"),
    moment().add(1, "days").format("YYYY-MM-DD")
  );

  let result = {
    today: forms.filter((r) => r.date === moment().format("YYYY-MM-DD")).length,
    days7: forms.filter((r) => days7Array.includes(r.date)).length,
    days30: forms.filter((r) => days30Array.includes(r.date)).length,
    total: forms.length,
  };
  //   console.log(result);
  return <FormChart sum={result} />;
};
