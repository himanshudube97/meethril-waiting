import { NextRequest, NextResponse } from 'next/server'
import { verifyUnsubscribeToken } from '@/lib/unsubscribe-token'
import { getResend } from '@/lib/resend'

export const runtime = 'nodejs'

const SUCCESS_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>you've been removed</title>
  </head>
  <body style="margin:0;padding:0;background:#FFE2BC;font-family:Georgia,'Times New Roman',serif;color:#3A1F26;min-height:100vh;display:flex;align-items:center;justify-content:center;">
    <div style="max-width:480px;padding:48px 32px;text-align:center;">
      <div style="font-size:24px;letter-spacing:0.18em;font-weight:500;margin-bottom:32px;">MEETHRIL</div>
      <p style="font-size:18px;line-height:1.7;font-style:italic;margin:0 0 16px;">You've been removed from the list.</p>
      <p style="font-size:14px;line-height:1.7;color:#6E4248;margin:0;">If this was a mistake, you're welcome back at meethril.com.</p>
    </div>
  </body>
</html>`

const ERROR_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>invalid link</title>
  </head>
  <body style="margin:0;padding:0;background:#FFE2BC;font-family:Georgia,'Times New Roman',serif;color:#3A1F26;min-height:100vh;display:flex;align-items:center;justify-content:center;">
    <div style="max-width:480px;padding:48px 32px;text-align:center;">
      <p style="font-size:16px;line-height:1.6;font-style:italic;">This unsubscribe link is invalid or expired.</p>
    </div>
  </body>
</html>`

async function handle(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const token = url.searchParams.get('t')
  if (!token) {
    return new NextResponse(ERROR_HTML, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const email = verifyUnsubscribeToken(token)
  if (!email) {
    return new NextResponse(ERROR_HTML, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // Mark contact as unsubscribed in Resend. Failures are logged but we still
  // show success — the user clicked unsubscribe and shouldn't see an error.
  try {
    await getResend().contacts.update({
      email,
      unsubscribed: true,
    })
  } catch (err) {
    console.error('[unsubscribe] resend update error', err)
  }

  return new NextResponse(SUCCESS_HTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export async function GET(req: NextRequest) {
  return handle(req)
}

export async function POST(req: NextRequest) {
  return handle(req)
}
