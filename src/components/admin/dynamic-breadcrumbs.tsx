"use client"

import { usePathname } from "next/navigation"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

const routeMap: Record<string, string> = {
  dashboard: "Dashboard",
  items: "Inventory Management",
  users: "User Management",
  settings: "Settings",
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter((item) => item !== "")

  return (
    <BreadcrumbList>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`
        const isLast = index === segments.length - 1
        const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

        const isUUID = /^[0-9a-fA-F]{24}$/.test(segment) || /^[0-9a-fA-F-]{36}$/.test(segment)
        const displayLabel = isUUID ? "Details" : label

        return (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{displayLabel}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{displayLabel}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        )
      })}
    </BreadcrumbList>
  )
}