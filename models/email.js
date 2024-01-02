import { Schema, model, models } from "mongoose";

const EmailSchema = new Schema(
  {
    state: {
      type: String,
      require: false,
      // required: [true, "State is required."],
    },
    subscribable_id: {
      type: Number,
      require: false,
      // required: [true, "id is required."],
    },
    subscribable_type: {
      type: String,
      require: false,
      // required: [true, "subscribable type is required."],
    },
    name: {
      type: String,
      require: false,
      // required: [true, "username is required."],
    },
    email: {
      type: String,
      require: false,
      // required: [true, "email is required."],
    },
    id: {
      type: String,
      require: false,
      // required: [true, "form id is required."],
    },
    topic: {
      type: String,
      require: false,
      // required: [true, "form id is required."],
    },
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    location: {
      type: String,
      required: false,
    },
    fields: {
      type: Object,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Emails = models.emails || model("emails", EmailSchema);

export default Emails;
