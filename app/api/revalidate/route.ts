import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    // Revalidate the specific path or all blog paths
    if (path) {
      revalidatePath(path)
    } else {
      // Revalidate all blog pages
      revalidatePath("/blog")
      revalidatePath("/blog/[slug]", "page")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
