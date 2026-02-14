"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ClaimButtonProps {
  itemId: string;
  isAuthenticated: boolean;
}

export function ClaimButton({ itemId, isAuthenticated }: ClaimButtonProps) {
  const router = useRouter();

  const handleClaim = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to claim an item.");
      router.push(`/login?callbackUrl=/items`);
      return;
    }
    
    toast.info("Claim feature coming soon.");
  };

  return (
    <Button 
      onClick={handleClaim}
      variant="default"
      className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-50 dark:text-slate-900"
    >
      Claim Item
    </Button>
  );
}