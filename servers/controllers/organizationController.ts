import { Request, Response } from "express";
import Organization from "../models/organizationalModel";

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};