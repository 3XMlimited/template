import { Schema, model, models } from "mongoose";

const TemplateSchema = new Schema(
  {
    topic: {
      type: String,
      required: [true, "Topic is required."],
    },
    forms: {
      type: String,
      required: [true, "Forms is required."],
    },
    pixel_id: {
      type: String,
      required: [true, "Pixel is required."],
    },
    headline: {
      type: String,
      required: [true, "Headline is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },

    image: {
      type: String,
      required: [true, "image is required."],
    },

    categories: {
      type: Array,
      required: [true, "categories is required."],
    },
    scores: {
      type: Array,
      required: [true, "scores is required."],
    },
    question_list: {
      type: Array,
      required: [true, "question_list is required."],
    },
    question_for_link: {
      type: String,
      required: [true, "question_for_link is required."],
    },
    button_link: {
      type: String,
      required: [true, "button_link is required."],
    },
    domains: {
      type: Array,
      required: [true, "domains is required."],
    },
    domains_url: {
      type: Array,
      required: [true, "domains url is required."],
    },
    logo: {
      type: String,
      required: [true, "logo is required."],
    },
    thankyou_content: {
      type: String,
      required: [true, "thankyou_content is required."],
    },
    state: {
      type: Boolean,
      required: [true, "State is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Templates = models.templates || model("templates", TemplateSchema);
export default Templates;
