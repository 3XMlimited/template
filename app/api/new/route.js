import { connectToDB } from "@/utils/database";
import { getCloudinary } from "@/utils/uploadImage";
import Templates from "@/models/template";
// import { v2 as cloudinary } from "cloudinary";
export const POST = async (req) => {
  // cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

  // const res = await cloudinary.uploader.upload(url, {
  //   public_id: "olympic_flag",
  // });
  //

  const { data } = await req.json();

  try {
    await connectToDB();
    const image = await getCloudinary(data.image);
    const logo = await getCloudinary(data.logo);
    const newTemplate = new Templates({
      topic: data.topic,
      forms: data.forms,
      language: data.language,
      headline: data.headline,
      pixel_id: data.pixel_id,
      content: data.content,
      image,
      categories: data.categories,
      scores: data.scores,
      question_list: data.question_list,
      question_for_link: data.question_for_link,
      question_content: data.question_content,
      button_name: data.button_name,
      button_link: data.button_link,
      domains: data.domains,
      domains_url: data.domains_url,
      thankyou_content: data.thankyou_content,
      logo,
      state: data.state,
    });
    await newTemplate.save();
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
    const image = await getCloudinary(data.image);
    const logo = await getCloudinary(data.logo);

    const newTemplate = new Templates({
      topic: data.topic,
      forms: data.forms,
      language: data.language,
      pixel_id: data.pixel_id,
      headline: data.headline,
      content: data.content,
      image,
      categories: data.categories,
      scores: data.scores,
      question_list: data.question_list,
      question_for_link: data.question_for_link,
      question_content: data.question_content,
      button_link: data.button_link,
      button_name: data.button_name,
      domains: data.domains,
      domains_url: data.domains_url,
      logo,
      thankyou_content: data.thankyou_content,
      state: data.state,
    });
    await newTemplate.save();

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
