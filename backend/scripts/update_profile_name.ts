import "dotenv/config";
import mongoose from "mongoose";
import { Profile } from "../src/models/Profile";

const updateProfileName = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";
    await mongoose.connect(mongoUri);
    
    const profile = await Profile.findOne();
    if (profile) {
      profile.name = "Xyaon's Porto";
      await profile.save();
      console.log("Profile name updated to Xyaon's Porto");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error updating profile:", error);
    process.exit(1);
  }
};

updateProfileName();
