# Contact Form & Email Setup

Complete setup guide for the Modern Construx contact form with Google Workspace SMTP.

---

## Quick Start

### 1. Create Google App Password (Required)

> ⚠️ **You must use an App Password, not your regular Google password!**

1. Go to your Google Account: https://myaccount.google.com
2. Enable **2-Factor Authentication** if not already enabled
3. Go to **Security** → **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and your device
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2. Local Development Setup

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your values
```

Your `.env.local` should look like:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=manuel@modernconstrux.xyz
SMTP_PASS=abcd-efgh-ijkl-mnop
MAIL_TO=Manuel@modernconstrux.xyz
MAIL_FROM=manuel@modernconstrux.xyz
```

Then restart your dev server:

```bash
npm run dev
```

### 3. Vercel Production Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Add each variable:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `manuel@modernconstrux.xyz` |
| `SMTP_PASS` | Your 16-char App Password |
| `MAIL_TO` | `Manuel@modernconstrux.xyz` |
| `MAIL_FROM` | `manuel@modernconstrux.xyz` |

4. Click **Save** for each variable
5. Go to **Deployments** → click **...** → **Redeploy**

---

## Google Workspace SMTP Configuration

The contact form uses these settings for Google Workspace:

```
Host: smtp.gmail.com
Port: 587
Security: STARTTLS (secure: false in Nodemailer)
Authentication: App Password
```

### Why App Passwords?

Google blocks "less secure apps" by default. App Passwords are:
- Required when 2FA is enabled
- More secure than regular passwords
- Revocable without changing your main password

### Troubleshooting Google SMTP

**"Invalid login" or "Authentication failed"**
- You're using your regular password instead of an App Password
- The App Password has spaces removed (it should be 16 characters, no spaces)
- 2FA is not enabled on your Google account

**"Certificate" or "TLS" errors**
- Make sure `SMTP_PORT=587` (not 465)
- The code uses STARTTLS which is correct for port 587

**Emails going to spam**
- Add SPF/DKIM records to your domain DNS
- Make sure MAIL_FROM matches your domain

---

## Features

### Contact Form (`/api/contact`)

- ✅ Validates name, email, message (required), phone (optional)
- ✅ Honeypot spam protection
- ✅ Rate limiting (5 requests/min per IP)
- ✅ Only returns success when email actually sends
- ✅ Supports image attachments from AI Visualizer
- ✅ Beautiful HTML email with all form data

### AI Visualizer Integration

When users submit from the AI Visualizer page:
- Their uploaded photo is attached to the email
- Project type, style, and notes are included
- Source is labeled "AI Visualizer" in the email

---

## Testing Checklist

### Local Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test without SMTP configured:**
   - Submit contact form
   - Should show error: "Email service is not configured..."
   - Check terminal: `[Contact] ❌ SMTP not configured`

3. **Test with SMTP configured:**
   - Add env vars to `.env.local`
   - Restart dev server
   - Submit contact form
   - Should show success: "Thank you..."
   - Check terminal: `[Contact] ✅ Email sent successfully`
   - Check your inbox

4. **Test AI Visualizer upload:**
   - Go to /ai-visualizer
   - Upload a photo
   - Fill out the form and submit
   - Check email includes the attachment

### Production Testing

1. Add env vars in Vercel Dashboard
2. Redeploy the project
3. Submit contact form
4. Verify email arrives (check spam folder too)
5. Check Vercel Function logs if issues:
   - Deployments → Latest → Functions tab → `/api/contact`

---

## API Response Codes

| Status | Response | Meaning |
|--------|----------|---------|
| 200 | `{ ok: true }` | Email sent successfully |
| 400 | `{ ok: false, error: "...", details: [...] }` | Validation error |
| 429 | `{ ok: false, error: "Too many requests" }` | Rate limited |
| 500 | `{ ok: false, error: "..." }` | SMTP not configured or send failed |

---

## Files

| File | Purpose |
|------|---------|
| `app/api/contact/route.ts` | Contact form API (Next.js App Router) |
| `app/api/visualize/route.ts` | AI image generation API |
| `app/contact/page.tsx` | Contact form UI |
| `app/ai-visualizer/page.tsx` | AI Visualizer UI |
| `env.example` | Environment variable template |

---

## Security Notes

- SMTP credentials are server-side only (never exposed to browser)
- Honeypot field catches most bots
- Rate limiting prevents abuse
- Email content is HTML-escaped to prevent injection
- Attachments are validated for type and size
