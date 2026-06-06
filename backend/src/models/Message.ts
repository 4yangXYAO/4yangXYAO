import { Schema, model, type InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true, minlength: 10 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type MessageDocument = InferSchemaType<typeof messageSchema>;

export const Message = model("Message", messageSchema);
