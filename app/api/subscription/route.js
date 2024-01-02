"use server";
import { connectToDB } from "@/utils/database";
import moment from "moment";
import Emails from "@/models/email";
import { getDaysArray } from "@/utils/utils";

export const POST = async (req) => {
  const body = await req.json();
  const { rules, pageNumber } = await body;

  // console.log(rules);

  try {
    await connectToDB();

    const limit = parseInt(20);
    const totalPosts = (await Emails.find(rules)).length;
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    let result = {};
    result.totalPosts = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < totalPosts) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Emails.find(rules)
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;

    return new Response(JSON.stringify(result), { status: 201 });
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

export const GET = async (req) => {
  try {
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
      today: forms.filter((r) => r.date === moment().format("YYYY-MM-DD"))
        .length,
      days7: forms.filter((r) => days7Array.includes(r.date)).length,
      days30: forms.filter((r) => days30Array.includes(r.date)).length,
      total: forms.length,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", { status: 200 });
  }
};
