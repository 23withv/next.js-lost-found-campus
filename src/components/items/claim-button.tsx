"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ClaimButtonProps {
  itemId: string
  itemSlug: string 
  isAuthenticated: boolean
  userRole?: string
}

export function ClaimButton({ itemId, itemSlug, isAuthenticated, userRole }: ClaimButtonProps) {
  const router = useRouter()

  const handleClaim = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to claim an item.")
      router.push(`/login?callbackUrl=/claim/${itemSlug}`)
      return
    }

    if (userRole === "ADMIN") {
      toast.error("Administrators cannot claim items.")
      return
    }

    if (userRole !== "PELAPOR") {
      toast.error("Only registered users can claim items.")
      return
    }

    router.push(`/claim/${itemSlug}`)
  }

  return (
    <Button 
      type="button"
      onClick={handleClaim}
      variant="default"
      className="w-full font-bold h-9 bg-red-600 hover:bg-red-700 text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-98"
    >
      Claim Item
    </Button>   
  )
}