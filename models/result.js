import { Schema, model, models } from "mongoose";

const ResultSchema = new Schema(
  {
    total_subscriptions: {
      type: Number,
      require: false,
      // required: [true, "State is required."],
    },
    new_subscriptions: {
      type: Number,
      require: false,
    },

    total_forms: {
      type: Number,
      require: false,
    },
    forms: {
      type: Array, // {name subscriptions}
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Results = models.results || model("results", ResultSchema);

export default Results;
