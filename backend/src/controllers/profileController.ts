import type { Request, Response } from "express";
import { Profile } from "../models/Profile";

export const getProfile = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const profile = await Profile.findOne();
  res.json({ success: true, data: profile });
};

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, bio, tagline, email, location, skills, socialLinks } = req.body;

  const badJson = (field: string): void => {
    res
      .status(400)
      .json({ success: false, message: `Field ${field} harus JSON valid` });
  };

  let parsedSkills: unknown[] | undefined;
  if (skills !== undefined) {
    try {
      const parsed = JSON.parse(String(skills));
      if (!Array.isArray(parsed)) {
        badJson("skills (harus array)");
        return;
      }
      parsedSkills = parsed;
    } catch {
      badJson("skills");
      return;
    }
  }

  let parsedSocialLinks: Record<string, unknown> | undefined;
  if (socialLinks !== undefined) {
    try {
      const parsed = JSON.parse(String(socialLinks));
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        badJson("socialLinks (harus object)");
        return;
      }
      parsedSocialLinks = parsed;
    } catch {
      badJson("socialLinks");
      return;
    }
  }

  let profile = await Profile.findOne();

  if (!profile) {
    profile = new Profile();
  }

  profile.name = name || profile.name;
  profile.bio = bio || profile.bio;
  profile.tagline = tagline || profile.tagline;
  profile.email = email || profile.email;
  profile.location = location || profile.location;
  if (parsedSkills !== undefined) {
    profile.skills = parsedSkills as typeof profile.skills;
  }
  if (parsedSocialLinks !== undefined) {
    profile.socialLinks = parsedSocialLinks as typeof profile.socialLinks;
  }

  if (req.file) {
    profile.avatar = `/uploads/${req.file.filename}`;
  }

  await profile.save();
  res.json({ success: true, data: profile });
};
