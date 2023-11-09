import { connectToDB } from "@/utils/database";
import Templates from "@/models/template";

export const POST = async (req) => {
  const { data } = await req.json();

  try {
    await connectToDB();

    const newTemplate = new Templates({
      topic: data.topic,
      forms: data.forms,
      headline: data.headline,
      content: data.content,
      image: data.image,
      categories: data.categories,
      scores: data.scores,
      question_list: data.question_list,
      question_for_link: data.question_for_link,
      button_link: data.button_link,
      domains: data.domains,
      thankyou_content: data.thankyou_content,
      logo: data.logo,
      state: data.state,
    });
    await newTemplate.save();
    console.log("done");
    return new Response(JSON.stringify(newTemplate), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

export const PATCH = async (req) => {
  const { data } = await req.json();

  try {
    await connectToDB();
    const deleteTemplate = await Templates.deleteOne({ _id: data.id });
    const newTemplate = new Templates({
      topic: data.topic,
      forms: data.forms,
      headline: data.headline,
      content: data.content,
      image: data.image,
      categories: data.categories,
      scores: data.scores,
      question_list: data.question_list,
      question_for_link: data.question_for_link,
      button_link: data.button_link,
      domains: data.domains,
      logo: data.logo,
      thankyou_content: data.thankyou_content,
      state: data.state,
    });
    await newTemplate.save();
    console.log("done");
    return new Response(JSON.stringify(newTemplate), { status: 201 });
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
