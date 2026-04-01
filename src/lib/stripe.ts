import Stripe from 'stripe'
import { Vehicle, ShippingAddress } from './types'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function createCheckoutSession(
  vehicle: Vehicle,
  customerEmail: string,
  shippingAddress: ShippingAddress,
  successUrl: string,
  cancelUrl: string,
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.grade ? ` ${vehicle.grade}` : ''}`,
            description: `Stock #${vehicle.stockNumber} | ${vehicle.mileage.toLocaleString()} km | ${vehicle.transmission} | ${vehicle.drivetrain}`,
            images: vehicle.images.length > 0 ? [vehicle.images[0]] : [],
            metadata: {
              vehicleId: vehicle.id,
              stockNumber: vehicle.stockNumber,
            },
          },
          unit_amount: Math.round(vehicle.price * 100), // vehicle price in cents
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'International Shipping (Japan → US Port, RoRo)',
            description: 'Roll-on/Roll-off ocean freight from Japan to nearest US port',
          },
          unit_amount: Math.round(vehicle.shippingEstimate * 100),
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Import Processing & Customs',
            description: 'Import duty (~2.5%) + customs brokerage fee',
          },
          unit_amount: Math.round((vehicle.totalLandedCost - vehicle.price - vehicle.shippingEstimate) * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      vehicleId: vehicle.id,
      stockNumber: vehicle.stockNumber,
      vehicleJson: JSON.stringify({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
      }),
      shippingAddressJson: JSON.stringify(shippingAddress),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}
