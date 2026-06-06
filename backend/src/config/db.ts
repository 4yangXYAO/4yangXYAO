import mongoose from "mongoose";

export const connectDB = async (mongoUri: string): Promise<void> => {
  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
};
