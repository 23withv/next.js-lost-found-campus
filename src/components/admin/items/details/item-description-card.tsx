import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface ItemDescriptionCardProps {
  description: string
}

export function ItemDescriptionCard({ description }: ItemDescriptionCardProps) {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/20 border-b">
        <div className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">Public Description</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pe-10">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}