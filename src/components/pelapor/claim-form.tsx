"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { claimSchema, ClaimFormValues } from "@/lib/validators/claim"
import { submitClaim } from "@/actions/claim"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ShieldAlert } from "lucide-react"

interface ClaimFormProps {
  itemId: string
}

export function ClaimForm({ itemId }: ClaimFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const form = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      proofDescription: "",
      alternateContact: "",
    },
  })

  async function onSubmit(data: ClaimFormValues) {
    setIsPending(true)
    
    const result = await submitClaim(itemId, data)

    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success(result.success)
    router.push(`/items/${itemId}`)
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/20 border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">Ownership Verification</CardTitle>
        </div>
        <CardDescription>
          Provide specific details that only the true owner would know.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="proofDescription" className="font-semibold">
              Proof of Ownership <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="proofDescription"
              placeholder="Describe unique marks, serial numbers, exact contents, or when/where you lost it..."
              className="min-h-[120px] resize-none"
              {...form.register("proofDescription")}
              disabled={isPending}
            />
            {form.formState.errors.proofDescription && (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.proofDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="alternateContact" className="font-semibold">
              Alternate Contact Number (Optional)
            </Label>
            <Input
              id="alternateContact"
              placeholder="+62 812 3456 7890"
              {...form.register("alternateContact")}
              disabled={isPending}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full font-bold" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Claim...
              </>
            ) : (
              "Submit Verification Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}