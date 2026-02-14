import mongoose, { Schema, Model } from "mongoose";
import { IClaim } from "@/types/db";

const ClaimSchema = new Schema<IClaim>(
  {
    item: { 
      type: Schema.Types.ObjectId, 
      ref: "Item", 
      required: true 
    },
    claimer: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["PENDING", "VERIFIED", "REJECTED"], 
      default: "PENDING" 
    },
    proofDescription: { 
      type: String, 
      required: [true, "Proof description is required"],
      minlength: [20, "Proof description must be at least 20 characters"]
    },
    adminFeedback: { 
      type: String, 
      default: "" 
    },
    resolvedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const ClaimModel: Model<IClaim> = mongoose.models.Claim || mongoose.model<IClaim>("Claim", ClaimSchema);

export default ClaimModel;