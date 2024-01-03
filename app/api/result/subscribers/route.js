"use server";
import { connectToDB } from "@/utils/database";
import moment from "moment";
import Results from "@/models/result";
import { getDaysArray } from "@/utils/utils";
import { Result } from "postcss";

export const POST = async (req) => {
  const body = await req.json();
  const { rules } = await body;

  try {
    await connectToDB();
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
    const data = await Results.find(rules);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get the result", { status: 500 });
  }
};

export const PATCH = async (req) => {
  const body = await req.json();
  const { rules } = await body;

  try {
    await connectToDB();

    const result = await Emails.find(rules);
    return new Response(JSON.stringify(result, { status: 200 }));
  } catch (error) {
    return new Response("Failed to find data", { status: 200 });
  }
};
