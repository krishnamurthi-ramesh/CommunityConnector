import mongoose, { Schema, Document } from "mongoose";

interface IOrganization extends Document {
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true },
  services: { type: [String], required: true },
});

export default mongoose.model<IOrganization>("Organization", OrganizationSchema);