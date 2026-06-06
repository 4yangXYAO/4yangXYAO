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

  let profile = await Profile.findOne();

  if (!profile) {
    profile = new Profile();
  }

  profile.name = name || profile.name;
  profile.bio = bio || profile.bio;
  profile.tagline = tagline || profile.tagline;
  profile.email = email || profile.email;
  profile.location = location || profile.location;
  profile.skills = skills ? JSON.parse(skills) : profile.skills;
  profile.socialLinks = socialLinks
    ? JSON.parse(socialLinks)
    : profile.socialLinks;

  if (req.file) {
    profile.avatar = `/uploads/${req.file.filename}`;
  }

  await profile.save();
  res.json({ success: true, data: profile });
};
