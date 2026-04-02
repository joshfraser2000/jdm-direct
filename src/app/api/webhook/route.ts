// Stripe webhook — records confirmed orders into Supabase.
// Register this endpoint in your Stripe dashboard:
// https://dashboard.stripe.com/webhooks
// Event to listen for: checkout.session.completed

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const vehicleData = session.metadata?.vehicleJson
      ? JSON.parse(session.metadata.vehicleJson)
      : {}
    const shippingAddress = session.metadata?.shippingAddressJson
      ? JSON.parse(session.metadata.shippingAddressJson)
      : {}

    // Store order in Supabase
    const { error } = await supabaseAdmin.from('orders').insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
      vehicle_id: session.metadata?.vehicleId,
      stock_number: session.metadata?.stockNumber,
      vehicle_make: vehicleData.make,
      vehicle_model: vehicleData.model,
      vehicle_year: vehicleData.year,
      customer_email: session.customer_email,
      customer_name: shippingAddress.name,
      shipping_address: shippingAddress,
      total_paid: (session.amount_total ?? 0) / 100,
      status: 'payment_confirmed',
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Supabase insert error:', error)
      // Don't return error to Stripe — payment succeeded, log and alert manually
    }
  }

  return NextResponse.json({ received: true })
}
