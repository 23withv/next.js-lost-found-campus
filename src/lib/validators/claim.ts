import * as z from "zod"

export const claimSchema = z.object({
  proofDescription: z
    .string()
    .min(20, { message: "Proof description must be at least 20 characters long." }),
  alternateContact: z
    .string()
    .optional(),
})

export type ClaimFormValues = z.infer<typeof claimSchema>