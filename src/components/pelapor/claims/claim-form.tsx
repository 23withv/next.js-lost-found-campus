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
import { Loader2, ShieldAlert, CheckCircle2, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

interface ClaimFormProps {
  itemId: string
}

export function ClaimForm({ itemId }: ClaimFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    setIsSubmitted(true)
    toast.success("Verification request submitted successfully")
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-primary/10 shadow-lg overflow-hidden bg-background animate-in fade-in zoom-in duration-300">
        <div className="h-2 bg-primary w-full" />
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-black uppercase italic tracking-tight">
              Request Received
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Your ownership verification request has been successfully logged into our system for review.
            </p>
          </div>

          <div className="w-full bg-muted/50 rounded-xl p-5 border border-dashed border-muted-foreground/20 text-left space-y-4">
            <div className="flex gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider">Validation Office</p>
                <p className="text-xs text-muted-foreground">
                  Please proceed to the Campus Administrative Center (Room 204) with a valid Student ID for physical validation.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full gap-3 pt-4">
            <Button asChild size="lg" className="font-bold uppercase tracking-widest h-12">
              <Link href="/my-reports">
                View My Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
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
            className="w-full font-bold h-12 uppercase tracking-widest" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Submission...
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