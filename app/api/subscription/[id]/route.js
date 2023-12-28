import { connectToDB } from "@/utils/database";
import Emails from "@/models/email";

export const POST = async (req) => {
  const body = await req.json();
  const data = await body.data;

  try {
    await connectToDB();

    const newForms = await Emails.create(data);

    return new Response(JSON.stringify(newForms), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectToDB();

    let emails = await Emails.find({ id });

    return new Response(
      JSON.stringify({ total_subscriptions: emails.length }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const DELETE = async (req) => {
  const { _id } = await req.json();
  console.log(_id);
  try {
    await connectToDB();

    const form = await Emails.deleteOne({ _id });
    console.log(form);
    return new Response(JSON.stringify(form), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
