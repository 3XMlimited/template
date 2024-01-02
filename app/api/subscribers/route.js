"use server";
import { connectToDB } from "@/utils/database";
import moment from "moment";
import Emails from "@/models/email";
import { getDaysArray } from "@/utils/utils";

export const POST = async (req) => {
  const body = await req.json();
  const { forms, name, email } = await body;

  // console.log(rules);
  const data = [];
  forms.map((form) =>
    data.push({
      state: "Client",
      name,
      email,
      id: form.id,
      location: null,
      date: moment().format("YYYY-MM-DD"),
      topic: form.name,
    })
  );

  try {
    await connectToDB();
    const newUser = await Emails.insertMany(data);

    return new Response(JSON.stringify(newUser), { status: 201 });
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

export const DELETE = async (req) => {
  try {
    const body = await req.json();
    const { ids } = await body;
    await Emails.deleteMany({ _id: { $in: ids } });
    console.log(ids);
    return new Response(JSON.stringify(ids), { status: 201 });
  } catch (error) {
    return new Response("Failed to delete email", { status: 500 });
  }
};
