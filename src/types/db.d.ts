import { Document, Types } from "mongoose";

export type ItemType = "LOST" | "FOUND";
export type ItemCategory = "Electronics" | "Documents" | "Keys" | "Clothing" | "Others";
export type ItemStatus = "PENDING" | "PUBLISHED" | "CLAIMED";
export type ClaimStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface IItem extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  hiddenDetails: string;
  type: ItemType;
  category: ItemCategory;
  location: string;
  date: Date;
  images: string[];
  status: ItemStatus;
  reporter: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClaim extends Document {
  _id: Types.ObjectId;
  item: Types.ObjectId;
  claimer: Types.ObjectId;
  status: ClaimStatus;
  proofDescription: string;
  adminFeedback?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}