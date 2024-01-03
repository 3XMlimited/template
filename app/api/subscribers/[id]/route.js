import { connectToDB } from "@/utils/database";
import Emails from "@/models/email";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectToDB();

    let emails = await Emails.findOne({ _id: id });

    return new Response(JSON.stringify({ emails }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const POST = async (req) => {
  const subscriber = await req.json();
  //   const { subscriber } = await body;

  try {
    await connectToDB();

    let emails = await Emails.findOneAndUpdate(
      { _id: subscriber._id },
      subscriber
    );

    return new Response(JSON.stringify(emails), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
