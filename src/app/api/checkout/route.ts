import { NextRequest, NextResponse } from 'next/server'
import { getVehicleById } from '@/lib/vehicles-api'
import { createCheckoutSession } from '@/lib/stripe'
import { ShippingAddress } from '@/lib/types'

const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
])

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPostalCode(zip: string) {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

function validateShippingAddress(addr: Partial<ShippingAddress>): string | null {
  if (!addr.name?.trim()) return 'Name is required'
  if (!addr.line1?.trim()) return 'Street address is required'
  if (!addr.city?.trim()) return 'City is required'
  if (!addr.state || !US_STATES.has(addr.state.toUpperCase())) return 'Valid US state code required'
  if (!addr.postalCode || !isValidPostalCode(addr.postalCode)) return 'Valid 5-digit ZIP code required'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { vehicleId, customerEmail, shippingAddress } = body as {
      vehicleId?: string
      customerEmail?: string
      shippingAddress?: Partial<ShippingAddress>
    }

    if (!vehicleId) return NextResponse.json({ error: 'vehicleId is required' }, { status: 400 })
    if (!customerEmail || !isValidEmail(customerEmail))
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 })
    if (!shippingAddress)
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 })

    const addressError = validateShippingAddress(shippingAddress)
    if (addressError) return NextResponse.json({ error: addressError }, { status: 400 })

    const vehicle = await getVehicleById(vehicleId)
    if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    if (!vehicle.isEligible) return NextResponse.json({ error: 'Vehicle is not import eligible' }, { status: 400 })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await createCheckoutSession(
      vehicle,
      customerEmail,
      shippingAddress as ShippingAddress,
      `${baseUrl}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      `${baseUrl}/vehicles/${vehicleId}`,
    )

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
