import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface ItemHiddenDetailsCardProps {
  hiddenDetails: string
}

export function ItemHiddenDetailsCard({ hiddenDetails }: ItemHiddenDetailsCardProps) {
  return (
    <Card className="shadow-sm border border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/10">
      <CardHeader className="border-b border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Lock className="h-5 w-5" />
          <CardTitle className="text-base font-semibold">Internal Verification Note</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pe-10">
        <p className="text-blue-900/80 dark:text-blue-200/80 leading-relaxed italic text-[15px]">
          "{hiddenDetails || "No verification details provided."}"
        </p>
      </CardContent>
    </Card>
  )
}