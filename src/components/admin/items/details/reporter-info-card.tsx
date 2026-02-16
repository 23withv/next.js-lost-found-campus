import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"

interface ReporterInfoCardProps {
  reporter: any
}

export function ReporterInfoCard({ reporter }: ReporterInfoCardProps) {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/20 border-b">
        <CardTitle className="text-base font-semibold">Reporter Information</CardTitle>
      </CardHeader>
      <CardContent className="pe-10">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 border shadow-sm">
            <AvatarImage src={reporter?.image} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {reporter?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm">
              {reporter?.name || "Anonymous User"}
            </span>
            <Badge variant="secondary" className="mt-1 w-fit text-[10px] uppercase font-bold tracking-wider">
              {reporter?.role || "PELAPOR"}
            </Badge>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</span>
              <span className="text-sm font-medium text-foreground truncate">{reporter?.email || "N/A"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</span>
              <span className="text-sm font-medium text-foreground truncate">{reporter?.phone || "Not Provided"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}