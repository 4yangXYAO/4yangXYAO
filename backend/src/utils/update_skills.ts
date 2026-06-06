import "dotenv/config";
import { connectDB } from "../config/db";
import { Profile } from "../models/Profile";

const updateProfileWithSkills = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await connectDB(mongoUri);

  const skillsToAdd = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML/CSS",
    "Redux",
    "Framer Motion",
    "GPT",
    "Gemini",
    "Grok",
    "Hermes",
    "OpenCode",
    "Git",
    "Node.js",
    "MongoDB"
  ];

  const profile = await Profile.findOne();
  if (profile) {
    // Add only new skills
    const existingSkills = profile.skills.map(s => s.toLowerCase());
    const newSkills = skillsToAdd.filter(s => !existingSkills.includes(s.toLowerCase()));
    
    if (newSkills.length > 0) {
      profile.skills.push(...newSkills);
      await profile.save();
      console.log("Profile skills updated successfully:", newSkills);
    } else {
      console.log("All skills already exist in profile.");
    }
  } else {
    // Create profile if not exists
    await Profile.create({
      name: "Kharis Jalaludin",
      bio: "A clinical architect of digital ecosystems. Developer obsessed with absolute technical control and aesthetic excellence.",
      tagline: "ARCHITECTING DIGITAL_DREAMS",
      skills: skillsToAdd
    });
    console.log("Profile created with skills.");
  }

  await Profile.db.close();
};

updateProfileWithSkills().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
