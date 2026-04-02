import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, vehicleId, vehicleName, eligibleYear } = await req.json() as {
      email?: string
      vehicleId?: string
      vehicleName?: string
      eligibleYear?: number
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    if (!vehicleId)
      return NextResponse.json({ error: 'vehicleId required' }, { status: 400 })

    const { error } = await supabaseAdmin.from('waitlist').insert({
      email: email.trim(),
      vehicle_id: vehicleId,
      vehicle_name: vehicleName,
      eligible_year: eligibleYear,
      created_at: new Date().toISOString(),
    })

    if (error && error.code !== '23505') {
      // 23505 = unique violation (already signed up) — treat as success
      console.error('[waitlist] Supabase error:', error.message)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
