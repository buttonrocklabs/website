# Lead capture and UTM links

## How it works

1. A visitor lands on any page. `captureAttribution()` (src/lib/attribution.ts) stores the first touch and the last tagged touch in their browser (localStorage). Nothing is sent anywhere yet.
2. The form (src/components/LeadForm.tsx) appears on the Home contact section and on `/start`. Submitting posts the form plus attribution to `/api/lead`.
3. `functions/api/lead.ts` validates, drops bots (honeypot, origin check), and emails the lead to Greg through Brevo. Subject line: `[BRL lead: <source>] <intent>: <name>`. The body carries the full first and last touch.

Visits that never submit the form are not measured by this. For visit counts, turn on Cloudflare Web Analytics (Pages project > Metrics) and allow its script in `public/_headers`, and update the Privacy page.

## One-time setup (Cloudflare Pages > website > Settings > Variables and Secrets)

| Name | Type | Notes |
|---|---|---|
| `BREVO_API_KEY` | Secret | Required. A Brevo API v3 key. |
| `LEAD_FROM_EMAIL` | Text | Optional. Must be a sender validated in Brevo. Default `greg@buttonrocklabs.com`. |
| `LEAD_TO_EMAIL` | Text | Optional. Where leads land. Default `greg@buttonrocklabs.com`. |

Set them for Production and Preview, then redeploy. Without `BREVO_API_KEY` the endpoint answers 503 and the form shows an email fallback.

## UTM convention

Point every external link at `https://buttonrocklabs.com/start` and tag it.

| Parameter | Use | Values |
|---|---|---|
| `utm_source` | Where the link lives | `linkedin`, `upwork`, `contra`, `catalant`, `toptal`, `btg`, `podcast`, `email`, `referral` |
| `utm_medium` | Kind of channel | `social`, `marketplace`, `podcast`, `email`, `referral` |
| `utm_campaign` | The push | `trailhead-2026-10`, `essay-launch`, `guest-spot` |
| `utm_content` | The specific post or listing | `profile-featured`, `post-vibe-coding`, `project-catalog` |

Lowercase, hyphens, no spaces. Keep a row per link in your tracking sheet.

### Ready-to-use links

| Where | Link |
|---|---|
| LinkedIn profile, Featured and Contact info | `https://buttonrocklabs.com/start?utm_source=linkedin&utm_medium=social&utm_campaign=trailhead-2026-10&utm_content=profile` |
| LinkedIn company page button | `https://buttonrocklabs.com/start?utm_source=linkedin&utm_medium=social&utm_campaign=trailhead-2026-10&utm_content=company-page` |
| LinkedIn post (change the slug each time) | `https://buttonrocklabs.com/start?utm_source=linkedin&utm_medium=social&utm_campaign=essay-launch&utm_content=post-SLUG` |
| Upwork Project Catalog listing | `https://buttonrocklabs.com/start?utm_source=upwork&utm_medium=marketplace&utm_campaign=trailhead-2026-10&utm_content=project-catalog` |
| Contra profile | `https://buttonrocklabs.com/start?utm_source=contra&utm_medium=marketplace&utm_campaign=trailhead-2026-10&utm_content=profile` |
| Podcast show notes | `https://buttonrocklabs.com/start?utm_source=podcast&utm_medium=podcast&utm_campaign=guest-spot&utm_content=SHOW-NAME` |
| Email signature | `https://buttonrocklabs.com/start?utm_source=email&utm_medium=email&utm_campaign=signature` |

Use `?intent=idea` or `?intent=workflow` (add with `&`) to pre-select the first dropdown for a targeted audience.

Some marketplaces strip or forbid external links in listings. Check each platform's rules before you add one.

## What to review monthly

Leads by `utm_source`, leads by intent, how many "found me via" answers disagree with the tagged source, and which `utm_content` posts produced inquiries.
