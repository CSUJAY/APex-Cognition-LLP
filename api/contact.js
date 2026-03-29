import nodemailer from 'nodemailer'

function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request) {
  const GMAIL_USER = process.env.GMAIL_USER || ''
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
  const CONTACT_TO = process.env.CONTACT_TO || GMAIL_USER || 'cognitionapex@gmail.com'

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return Response.json(
      {
        error:
          'Email is not configured. In Vercel: Project → Settings → Environment Variables, add GMAIL_USER and GMAIL_APP_PASSWORD.',
      },
      { status: 503 },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { name, email, message } = body || {}
  const n = typeof name === 'string' ? name.trim() : ''
  const e = typeof email === 'string' ? email.trim() : ''
  const m = typeof message === 'string' ? message.trim() : ''

  if (!n || !e || !m) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!isValidEmail(e)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (n.length > 200 || m.length > 8000) {
    return Response.json({ error: 'Message too long.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD.replace(/\s/g, ''),
    },
  })

  const teamText = [
    `New contact form submission`,
    ``,
    `Name: ${n}`,
    `Email: ${e}`,
    ``,
    `Message:`,
    m,
  ].join('\n')

  const autoReplyText = [
    `Hi ${n},`,
    ``,
    `Thanks for contacting Apex Cognition LLP.`,
    ``,
    `We have received your message and will review it shortly. Our team will get back to you soon.`,
    ``,
    `— Apex Cognition LLP`,
  ].join('\n')

  try {
    await transporter.sendMail({
      from: `"Apex Cognition" <${GMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: e,
      subject: `Website contact: ${n}`,
      text: teamText,
    })

    await transporter.sendMail({
      from: `"Apex Cognition" <${GMAIL_USER}>`,
      to: e,
      subject: 'We received your message — Apex Cognition LLP',
      text: autoReplyText,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[api/contact]', err)
    return Response.json(
      {
        error: 'Could not send email. Check Gmail app password and account settings.',
      },
      { status: 502 },
    )
  }
}
