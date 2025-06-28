import { type NextRequest, NextResponse } from "next/server"
import { createCheckoutSession } from "@/lib/stripe"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionUrl, error } = await createCheckoutSession({
      priceId,
      userId: user.id,
      userEmail: user.email || "",
      successUrl: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancelUrl: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ url: sessionUrl })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
