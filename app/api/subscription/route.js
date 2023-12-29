"use server";
import { connectToDB } from "@/utils/database";
import Emails from "@/models/email";

export const POST = async (req) => {
  const body = await req.json();
  const { rules, pageNumber } = await body;

  console.log(rules);

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
    return new Response("Failed to create a new post", { status: 500 });
  }
};
