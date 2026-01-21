import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    // Notion doesn't send webhooks, but you can use this endpoint
    // to manually trigger revalidation or integrate with other services

    console.log("Notion webhook received")

    // Revalidate all blog pages
    revalidatePath("/blog")
    revalidatePath("/blog/[slug]", "page")

    return NextResponse.json({
      message: "Blog revalidated successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 })
  }
}
