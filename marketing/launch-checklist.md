# Pre-launch & Launch Checklist

## Now — before any outreach (do this week)

- [ ] **Verify the site loads cleanly on mobile** — open meethril.com on your phone, scroll through, tap the form. No lag (we just shipped the perf fix).
- [ ] **Test the welcome email** — sign up with your own email; confirm it arrives, looks right on mobile, unsubscribe works.
- [ ] **Test the share/referral mechanic** — sign up, see the share section, click the share buttons, copy the link, open it in incognito, sign up again with a different email, check Vercel logs for `[waitlist] signup ref=...`.
- [ ] **OG image** — open meethril.com in Slack/iMessage. Does the link preview show a beautiful card? If not, add one in `src/app/layout.tsx` (1200x630, hero text on the warm gradient).
- [ ] **Set up a personal X/Twitter account** for the brand (`@meethrilapp` or similar) if you don't have one. Post the launch thread from here.
- [ ] **Set up Instagram brand account.** Add bio, link to meethril.com.
- [ ] **Set up an "answers email"** — `hello@meethril.com` should forward to a real inbox you check daily.

## Week 1 — soft seed

- [ ] Post the **X launch thread** (`platform-content.md`) on a Tuesday morning (10–11am your local time)
- [ ] Post **1 IG carousel** (`platform-content.md`)
- [ ] **Email 5 friends/family** with a personalized version of the cold outreach Archetype 1 template — they're your zeroth-degree reach
- [ ] Reply to **every single comment/DM personally**, within hours

## Week 2 — outreach begins

- [ ] **DM 5 creators per day** from `influencer-list.md`, mixing archetypes. Use templates in `cold-outreach.md`. Track in a sheet.
- [ ] Post **r/SideProject** (`platform-content.md`)
- [ ] Post **1 TikTok script** (`platform-content.md`)
- [ ] Post **2 X variants** (single-tweet versions, spread across the week)

## Week 3 — escalation + first launches

- [ ] Submit to **BetaList** (takes 2–4 weeks to review, so submit now even though target launch is later)
- [ ] **DM another 5 creators per day** — fresh names, no repeats
- [ ] Post **second IG carousel** + 1 IG story sequence
- [ ] Post **1 more TikTok**
- [ ] Reply to all the previous week's outreach: follow up *once* with anyone who didn't reply

## Week 4 — peak launch week

> Spread these across Tue–Thu. Don't all-on-Monday.

- [ ] **Tuesday 12:01am PT** — submit Product Hunt launch
- [ ] **Wednesday morning PT** — Show HN submission
- [ ] **Wednesday** — Indie Hackers Show IH post
- [ ] **Thursday** — second X thread (different angle: focus on encryption or on a single feature like sealed letters)
- [ ] All week: reply to every comment/DM/HN reply within an hour during work hours

## Ongoing (after launch week)

- [ ] **Weekly milestone post on IH/X** when you hit 100/500/1000/5000 signups — these get reshared
- [ ] **Monthly behind-the-scenes** — building in public is the long-game distribution channel
- [ ] **Reply to every share** — when someone tweets about meethril, reply with thanks and a follow

## What NOT to do (will hurt you)

- ❌ Do not buy followers/signups
- ❌ Do not auto-DM at scale (>15/day from a fresh account = ban)
- ❌ Do not post the same thing in 5 subreddits in 2 days
- ❌ Do not pay for influencer posts before launch — wait until you have product to point to
- ❌ Do not use AI to write replies — readers can tell, and journaling-space audiences are *especially* allergic to AI
- ❌ Do not run paid ads pre-launch — the waitlist conversion isn't worth it; save budget for post-launch
- ❌ Do not announce a launch date you can't hit. If May slips, say so quietly. Trust > timeline.

## Metrics to actually watch

| Metric | How to read it |
|---|---|
| Daily signups | Resend audience count |
| Referral signups | `grep "ref=" vercel-logs` |
| Top referrers | Manually count from logs (no DB) |
| Reply rate to outreach | Your tracking sheet |
| Time-to-reply on inbound DMs/email | Should be < 4 hours during launch week |

## Stop-loss rules

If after 6 weeks of consistent outreach + 2 launch posts you have:
- < 200 signups → the positioning isn't landing. Stop outreach. Rewrite the landing page. Get 5 strangers on a 10-min call.
- < 5% of waitlist clicking the share link in the welcome email → the share UX needs work. (Add the share link to the welcome email if you haven't.)
- < 1% conversion on `?ref=` clicks to signups → the share link is too generic; make it carry a personal note.
