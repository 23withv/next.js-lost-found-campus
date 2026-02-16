"use client"

import { useState } from "react"
import { processClaimValidation } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

interface ClaimActionControlsProps {
  claimId: string
}

export function ClaimActionControls({ claimId }: ClaimActionControlsProps) {
  const [isPending, setIsPending] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleAction = async (status: "VERIFIED" | "REJECTED") => {
    if (status === "REJECTED" && feedback.trim().length < 10) {
      toast.error("Please provide a reason for rejection (min 10 chars).")
      return
    }

    setIsPending(true)
    const result = await processClaimValidation(claimId, status, feedback)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.success)
    }
    
    setIsPending(false)
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Feedback / Reason
        </label>
        <Textarea 
          placeholder="Required for rejection, optional for approval..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="resize-none text-sm h-24"
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={() => handleAction("REJECTED")}
          disabled={isPending}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
          Reject
        </Button>
        <Button 
          onClick={() => handleAction("VERIFIED")}
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
          Approve
        </Button>
      </div>
    </div>
  )
}