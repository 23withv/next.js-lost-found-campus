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
      className="w-full font-bold h-9 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-50 dark:text-slate-900 transition-all cursor-pointer"
    >
      Claim Item
    </Button>   
  )
}