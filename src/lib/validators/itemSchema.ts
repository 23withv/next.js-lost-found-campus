import { z } from "zod";

const imageSchema = z.string().url("Invalid image URL");

export const itemSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title is too long (max 100 chars)"),
  
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  
  hiddenDetails: z
    .string()
    .min(10, "Hidden details are required and must be descriptive")
    .optional()
    .or(z.literal("")), 
  
  type: z.enum(["LOST", "FOUND"] as const, {
    required_error: "Type is required",
    invalid_type_error: "Type must be LOST or FOUND"
  }),
  
  category: z.enum(["Electronics", "Documents", "Keys", "Clothing", "Others"] as const, {
    required_error: "Category is required",
    invalid_type_error: "Please select a valid category"
  }),
  
  location: z
    .string({ required_error: "Location is required" })
    .min(3, "Location must be at least 3 characters"),
  
  date: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Date cannot be in the future",
  }),

  images: z.array(imageSchema).max(5, "Maximum 5 images allowed").optional(),
});

export type ItemInput = z.infer<typeof itemSchema>;