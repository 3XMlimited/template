import { connectToDB } from "@/utils/database";
import Templates from "@/models/template";

export const POST = async (req) => {
  const { id } = await req.json();

  try {
    await connectToDB();

    const newTemplate = await Templates.find({ _id: id });

    return new Response(JSON.stringify(newTemplate), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connectToDB();
    const projection = { _id: 1, topic: 1, image: 1 };
    let newTemplate = await Templates.find().select(projection);

    let array = [];
    newTemplate.map((r) =>
      array.push({ _id: r._id, topic: r.topic, image: r.image })
    );

    return new Response(JSON.stringify(array), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const DELETE = async (req) => {
  const { _id } = await req.json();
  try {
    await connectToDB();

    const newTemplate = await Templates.deleteOne({ _id });

    return new Response(JSON.stringify(newTemplate), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
