import mongoose, { Schema, Model } from "mongoose";
import { IItem } from "@/types/db";

const ItemSchema = new Schema<IItem>(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"]
    },
    description: { 
      type: String, 
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"]
    },
    hiddenDetails: {
      type: String,
      required: [true, "Hidden details are required for validation"],
      minlength: [10, "Hidden details must be at least 10 characters"]
    },
    type: { 
      type: String, 
      enum: ["LOST", "FOUND"], 
      required: [true, "Item type is required"] 
    },
    category: {
      type: String,
      enum: ["Electronics", "Documents", "Keys", "Clothing", "Others"],
      required: [true, "Category is required"]
    },
    location: { 
      type: String, 
      required: [true, "Location is required"],
      minlength: [3, "Location must be at least 3 characters"]
    },
    date: { 
      type: Date, 
      default: Date.now,
      required: [true, "Date is required"]
    },
    images: { 
      type: [String], 
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length <= 5;
        },
        message: "You can upload a maximum of 5 images"
      }
    },
    status: { 
      type: String, 
      enum: ["PENDING", "PUBLISHED", "CLAIMED"], 
      default: "PENDING" 
    },
    reporter: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

const ItemModel: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);

export default ItemModel;