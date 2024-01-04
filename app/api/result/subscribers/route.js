"use server";
import { connectToDB } from "@/utils/database";
import moment from "moment";
import Results from "@/models/result";
import Forms from "@/models/forms";
import Emails from "@/models/email";
import { getDaysArray } from "@/utils/utils";

export const POST = async (req) => {
  const body = await req.json();
  const { rules } = await body;

  try {
    await connectToDB();

    const data = await Results.find(rules);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get the result", { status: 500 });
  }
};

export const PATCH = async (req) => {
  // const body = await req.json();
  // const { rules } = await body;

  try {
    await connectToDB();
    const data = { forms: [] };
    const forms = await Forms.find({});
    forms.map((f) => data.forms.push({ id: f.id, name: f.name }));
    data.total_forms = forms.length;
    data.new_subscriptions = 0;
    for (let i = 0; i < data.forms.length; i++) {
      const element = data.forms[i];
      const subscriptions = await Emails.find({
        id: element.id,
        date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      });
      element.subscriptions = subscriptions.length;
      data.new_subscriptions += subscriptions.length;
    }
    const lastDateResult = await Results.findOne({
      date: moment().subtract(2, "days").format("YYYY-MM-DD"),
    });
    data.total_subscriptions =
      lastDateResult.total_subscriptions + data.new_subscriptions;
    data.date = moment().subtract(1, "days").format("YYYY-MM-DD");
    // const data = {
    //   total_subscriptions: 996,
    //   total_forms: 6,
    //   forms: [
    //     {
    //       id: "658d47c618bd9327fcadd5f5",
    //       name: "jobsonline",
    //       subscriptions: 567,
    //     },
    //     {
    //       id: "658d477f18bd9327fcadd5f0",
    //       name: "loans_app",
    //       subscriptions: 6,
    //     },
    //     {
    //       id: "658d471e30631c89a7f0b7b7",
    //       name: "becas",
    //       subscriptions: 29,
    //     },
    //     {
    //       id: "658d4144c3f1dc332de73a75",
    //       name: "studyabroad",
    //       subscriptions: 284,
    //     },
    //     {
    //       id: "658d404dc3f1dc332de73a19",
    //       name: "bestcreditcards",
    //       subscriptions: 10,
    //     },
    //     {
    //       id: "658d21653b695032f9497169",
    //       name: "croxroad",
    //       subscriptions: 100,
    //     },
    //   ],
    //   date: "2024-01-02",
    // };
    // const newUser = await Results.create(data);
    console.log(data);
    await Results.create(data);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get the result", { status: 500 });
  }
};
