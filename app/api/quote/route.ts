import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  name?: string
  company?: string
  email?: string
  phone?: string
  productType?: string
  quantity?: string
  notes?: string
  website?: string // honeypot
}

const escape = (v: unknown) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body
    if (body.website) return NextResponse.json({ ok: true }) // bot
    if (!body.name || !body.email || !body.company)
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY missing')
      return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 })
    }

    const to = process.env.QUOTE_TO_EMAIL || 'mgp@palletmail.com'
    const from = process.env.QUOTE_FROM_EMAIL || 'onboarding@resend.dev'

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: body.email,
      subject: `New quote request — ${body.name} (${body.company})`,
      html: `
        <h2>New Quote Request</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Name</b></td><td>${escape(body.name)}</td></tr>
          <tr><td><b>Company</b></td><td>${escape(body.company)}</td></tr>
          <tr><td><b>Email</b></td><td>${escape(body.email)}</td></tr>
          <tr><td><b>Phone</b></td><td>${escape(body.phone)}</td></tr>
          <tr><td><b>Product</b></td><td>${escape(body.productType)}</td></tr>
          <tr><td><b>Quantity</b></td><td>${escape(body.quantity)}</td></tr>
          <tr><td><b>Notes</b></td><td>${escape(body.notes).replace(/\n/g, '<br>')}</td></tr>
        </table>
      `,
    })

    if (error) {
      console.error('Resend error', error)
      return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('quote route error', e)
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
