import { connectToDB } from "@/utils/database";
import Forms from "@/models/forms";

export const POST = async (req) => {
  const body = await req.json();
  const data = await body.data;

  try {
    await connectToDB();

    const newForms = await Forms.create(data);

    return new Response(JSON.stringify(newForms), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connectToDB();

    let forms = await Forms.find({}).sort({
      created_at: -1,
    });

    return new Response(JSON.stringify(forms), { status: 201 });
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

    const form = await Forms.deleteOne({ _id });
    console.log(form);
    return new Response(JSON.stringify(form), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
