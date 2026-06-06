import "dotenv/config";
import mongoose from "mongoose";
import { Profile } from "../src/models/Profile";

const updateProfile = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const profileData = {
      name: "Kharis Jalaludin",
      tagline: "ARCHITECTING DIGITAL DREAMS THROUGH CODE",
      bio: "A clinical architect of digital ecosystems. My career is a sequence of precision-engineered milestones, transforming abstract business logic into high-performance user interfaces. This is the timeline of a developer obsessed with absolute technical control and aesthetic excellence.",
      email: "kharistentackel@gmail.com",
      location: "Indonesia",
      skills: [
        "React", "TypeScript", "Tailwind CSS", "Next.js", 
        "GPT", "Gemini", "Grok", "Hermes", "OpenCode"
      ],
      socialLinks: {
        github: "https://github.com/4yangXYAO",
        linkedin: "#",
        twitter: "#",
        whatsapp: "https://wa.me/62895330107704",
        website: "#"
      }
    };

    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, profileData);
      await profile.save();
      console.log("Profile updated successfully");
    } else {
      profile = new Profile(profileData);
      await profile.save();
      console.log("Profile created successfully");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error updating profile:", error);
    process.exit(1);
  }
};

updateProfile();
