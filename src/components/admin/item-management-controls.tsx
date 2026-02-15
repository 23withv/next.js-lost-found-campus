"use client"

import { useState } from "react"
import { changeItemStatus, deleteItem } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle, Trash2, Archive, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ControlsProps {
  itemId: string
  currentStatus: string
}

export function ItemManagementControls({ itemId, currentStatus }: ControlsProps) {
  const [isPending, setIsPending] = useState(false)

  const handleAction = async (action: () => Promise<any>, loadingMsg: string) => {
    setIsPending(true)
    const result = await action()
    if (result?.error) toast.error(result.error)
    else toast.success("Action completed")
    setIsPending(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {currentStatus === "PENDING" && (
        <Button 
          onClick={() => handleAction(() => changeItemStatus(itemId, "PUBLISHED"), "Publishing...")}
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
          Approve and Publish
        </Button>
      )}

      {currentStatus === "PUBLISHED" && (
        <Button 
          onClick={() => handleAction(() => changeItemStatus(itemId, "CLAIMED"), "Archiving...")}
          disabled={isPending}
          variant="secondary"
          className="w-full"
        >
          <Archive className="mr-2 h-4 w-4" />
          Mark as Resolved
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full" disabled={isPending}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Report
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the report
              from the campus database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction(() => deleteItem(itemId), "Deleting...")} className="bg-red-600">
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}