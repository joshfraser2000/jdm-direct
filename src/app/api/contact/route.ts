// Contact form submission handler.
// Currently logs to console and stores in Supabase.
// To send email notifications, add Resend or SendGrid:
//   npm install resend
//   https://resend.com/docs/send-with-nextjs

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const VALID_SUBJECTS = new Set([
  'vehicle_request',
  'order_status',
  'shipping_quote',
  'import_question',
  'general',
])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    if (!subject || !VALID_SUBJECTS.has(subject))
      return NextResponse.json({ error: 'Please select a subject' }, { status: 400 })
    if (!message?.trim() || message.trim().length < 10)
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 })

    // Store in Supabase (create the contact_submissions table in Supabase dashboard)
    const { error } = await supabaseAdmin.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
      created_at: new Date().toISOString(),
    })

    if (error) {
      // Log but don't fail — table may not exist yet
      console.error('[contact] Supabase insert error:', error.message)
    }

    // TODO: Send email notification using Resend/SendGrid
    // await sendEmail({ to: 'hello@jdmdirect.com', subject: `New ${subject} from ${name}`, body: message })

    console.log(`[contact] New submission from ${name} <${email}> — ${subject}`)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
