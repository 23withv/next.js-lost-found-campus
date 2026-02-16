export type ItemType = "LOST" | "FOUND"
export type ItemStatus = "PUBLISHED" | "CLAIMED"
export type Role = "ADMIN" | "PELAPOR"
export type ClaimStatus = "PENDING" | "VERIFIED" | "REJECTED"

export interface User {
  _id: string
  name: string
  email: string
  role: Role
  image?: string
  phone?: string
  createdAt?: string
}

export interface Item {
  _id: string
  slug: string
  title: string
  description: string
  hiddenDetails: string
  type: ItemType
  category: string
  location: string
  date: string
  images: string[]
  status: ItemStatus
  reporter: Partial<User>
  createdAt: string
  updatedAt?: string
}

export interface Claim {
  _id: string
  item: Partial<Item>
  claimer: Partial<User>
  status: ClaimStatus
  proofDescription: string
  alternateContact?: string | null
  adminFeedback?: string
  resolvedAt?: string
  createdAt: string
  updatedAt?: string
}