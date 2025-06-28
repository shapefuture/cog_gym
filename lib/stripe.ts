import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_demo", {
  apiVersion: "2023-10-16",
})

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  stripePriceId: string
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "trainer-monthly",
    name: "Trainer",
    price: 19,
    interval: "month",
    features: [
      "Unlimited bias assessments",
      "AI-powered insights",
      "Advanced analytics",
      "Priority support",
      "NFT achievements",
      "Leaderboard access",
    ],
    stripePriceId: process.env.STRIPE_TRAINER_MONTHLY_PRICE_ID || "price_trainer_monthly",
  },
  {
    id: "trainer-yearly",
    name: "Trainer",
    price: 190,
    interval: "year",
    features: [
      "Unlimited bias assessments",
      "AI-powered insights",
      "Advanced analytics",
      "Priority support",
      "NFT achievements",
      "Leaderboard access",
    ],
    stripePriceId: process.env.STRIPE_TRAINER_YEARLY_PRICE_ID || "price_trainer_yearly",
  },
  {
    id: "master-monthly",
    name: "Master",
    price: 49,
    interval: "month",
    features: [
      "Everything in Trainer",
      "1-on-1 coaching sessions",
      "Custom training programs",
      "API access",
      "White-label options",
      "Advanced NFT rewards",
    ],
    stripePriceId: process.env.STRIPE_MASTER_MONTHLY_PRICE_ID || "price_master_monthly",
  },
  {
    id: "master-yearly",
    name: "Master",
    price: 490,
    interval: "year",
    features: [
      "Everything in Trainer",
      "1-on-1 coaching sessions",
      "Custom training programs",
      "API access",
      "White-label options",
      "Advanced NFT rewards",
    ],
    stripePriceId: process.env.STRIPE_MASTER_YEARLY_PRICE_ID || "price_master_yearly",
  },
]

export async function createCheckoutSession(priceId: string, userId: string, successUrl: string, cancelUrl: string) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_demo") {
      // Demo mode
      return {
        url: `${successUrl}?session_id=demo_session_${Date.now()}`,
        error: null,
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        userId,
      },
    })

    return { url: session.url, error: null }
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return { url: null, error: error.message }
  }
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_demo") {
      // Demo mode
      return {
        url: returnUrl,
        error: null,
      }
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return { url: session.url, error: null }
  } catch (error) {
    console.error("Stripe portal error:", error)
    return { url: null, error: error.message }
  }
}

export async function handleWebhook(body: string, signature: string) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured")
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        // Handle successful subscription
        console.log("Subscription created:", session.id)
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription
        // Handle subscription updates
        console.log("Subscription updated:", subscription.id)
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        // Handle subscription cancellation
        console.log("Subscription cancelled:", deletedSubscription.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Webhook error:", error)
    return { success: false, error: error.message }
  }
}

export async function getSubscriptionStatus(customerId: string) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_demo") {
      // Demo mode
      return {
        status: "active",
        plan: "trainer-monthly",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        error: null,
      }
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      return {
        status: "inactive",
        plan: null,
        currentPeriodEnd: null,
        error: null,
      }
    }

    const subscription = subscriptions.data[0]
    const priceId = subscription.items.data[0]?.price.id
    const plan = subscriptionPlans.find((p) => p.stripePriceId === priceId)

    return {
      status: subscription.status,
      plan: plan?.id || null,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      error: null,
    }
  } catch (error) {
    console.error("Subscription status error:", error)
    return {
      status: "error",
      plan: null,
      currentPeriodEnd: null,
      error: error.message,
    }
  }
}
