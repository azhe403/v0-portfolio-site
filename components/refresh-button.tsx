"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function RefreshButton() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      // Call the revalidation API
      await fetch("/api/webhook/notion", {
        method: "POST",
      })

      // Refresh the current page
      router.refresh()
    } catch (error) {
      console.error("Error refreshing:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
      <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
      {isRefreshing ? "Refreshing..." : "Refresh"}
    </Button>
  )
}
