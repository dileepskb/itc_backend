"use client"
import { IconContext } from "react-icons";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()


  const pathname = usePathname()

  // "/dashboard/certificate/add"
  const paths = pathname.split("/").filter(Boolean)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />

          <Breadcrumb>
          <BreadcrumbList>
        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/")

          const isLast = index === paths.length - 1

          return (
            <span key={href} className="flex items-center gap-2">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {formatLabel(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formatLabel(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </span>
          )
        })}
      </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* 🔥 Dynamic content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <TooltipProvider><IconContext.Provider value={{ size: "10" }}>{children}</IconContext.Provider></TooltipProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// 🔥 label format function
function formatLabel(text: string) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}