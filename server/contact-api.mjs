import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env') })

const PORT = Number(process.env.CONTACT_API_PORT) || 8787
const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
const CONTACT_TO = process.env.CONTACT_TO || GMAIL_USER || 'cognitionapex@gmail.com'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '48kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasGmail: Boolean(GMAIL_USER && GMAIL_APP_PASSWORD) })
})

function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

app.post('/api/contact', async (req, res) => {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(503).json({
      error: 'Email is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env and restart the API server.',
    })
  }

  const { name, email, message } = req.body || {}
  const n = typeof name === 'string' ? name.trim() : ''
  const e = typeof email === 'string' ? email.trim() : ''
  const m = typeof message === 'string' ? message.trim() : ''

  if (!n || !e || !m) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!isValidEmail(e)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }
  if (n.length > 200 || m.length > 8000) {
    return res.status(400).json({ error: 'Message too long.' })
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

    return res.json({ ok: true })
  } catch (err) {
    console.error('[contact-api]', err)
    return res.status(502).json({
      error: 'Could not send email. Check Gmail app password and account settings.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
})
