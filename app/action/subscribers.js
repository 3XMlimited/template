"use server";
import { connectToDB } from "@/utils/database";
import Emails from "@/models/email";
import SubscriptionTable from "@/components/subscribers/SubscriptionTable";

export const SubscriptionList = async ({ rules }) => {
  await connectToDB();
  let pageNumber = 0;
  const limit = parseInt(20);
  const totalPosts = await Emails.countDocuments().exec();
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
  if (endIndex < (await Emails.countDocuments().exec())) {
    result.next = {
      pageNumber: pageNumber + 1,
      limit: limit,
    };
  }
  result.data = await Emails.find({ rules })
    .sort({ _id: -1 })
    .skip(startIndex)
    .limit(limit)
    .exec();
  result.rowsPerPage = limit;
  console.log(result);

  //   console.log(result);
  return result?.data?.map((email, index) => (
    <SubscriptionTable email={email} index={index} />
  ));
};
