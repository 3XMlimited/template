import { Schema, model, models } from "mongoose";

const FormsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "form is required."],
    },
    type: {
      type: String,
      required: [true, "type is required."], //embed
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    url: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: [true, "title is required."],
    },
    description: {
      type: String,
      required: [true, "description is required."],
    },
    sign_up_button_text: {
      type: String,
      required: false,
    },
    success_message: {
      type: String, /// "Subscribe",
      required: false, // "Success! Now check your email to confirm your subscription."
    },
    custom_fields: {
      type: Array,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Forms = models.forms || model("forms", FormsSchema);
export default Forms;
