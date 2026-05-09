# Launch Submissions

These convert because the audiences self-select for early-stage products. Submit each on a different day across launch week (Mon–Fri); same week is fine, same day is overload.

---

## Product Hunt

> Submit Tue–Thu, around 12:01am PT. Avoid Mondays (lower traffic), Fridays (heavy launches drown you out).

**Tagline (60 char max):**
> A quieter place to think — journaling without the noise.

**Description (260 char max):**
> Meethril is a quiet, end-to-end encrypted journaling app. Write entries, seal letters until a future date, build scrapbooks. No streaks, no reminders, no AI generating your thoughts. Made for people who are tired of being optimized.

**First comment (post immediately as maker):**
> Hi PH ♥
>
> I'm Himanshu. I built Meethril because every journaling app I tried felt like it was selling me something — productivity, streaks, AI features I didn't ask for, a wellness score.
>
> I wanted a place that just... lets me write. So I made one.
>
> A few things I'm proud of:
>
> · End-to-end encryption — even I can't read your words
> · Letters you can seal until a date you choose (your future self, a friend, an anonymous stranger across the world)
> · Scrapbooks for the things words alone can't carry
> · Theme-driven memory — old entries return when you need them, in their own way
>
> It's free to join the waitlist. The app opens in late May. Quiet beta first.
>
> I'd love your honest feedback on the landing page, the design, the positioning. What works? What's confusing? What's missing?
>
> Thank you for taking a look. ♥

**Topics to tag:** Productivity, Writing, Health & Fitness, Privacy, Design Tools

**Maker comments to seed:** comment thoughtfully on 5–10 other launches the morning of yours. PH community reciprocates.

---

## Show HN (Hacker News)

> Submit early morning Pacific time on a weekday. **Title rules:** must start with "Show HN: " and be specific.

**Title:**
> Show HN: Meethril – an end-to-end encrypted journaling app with no streaks or AI

**URL:** https://meethril.com

**Body comment (post immediately):**
> Hi HN. I've been building Meethril solo for the last few months. It's a journaling web app that holds entries, sealed letters (to your future self, a friend on a chosen date, or an anonymous stranger), scrapbooks, and a theme-driven memory feature.
>
> The technical bits HN tends to care about:
>
> · End-to-end encryption — words are encrypted on-device with a key only the user holds. The server never sees plaintext.
> · Built with Next.js (App Router), Tailwind, Framer Motion. Resend for transactional email.
> · No tracking, no analytics on entry content, no LLM ingestion.
> · The waitlist site itself is intentionally simple — single page, static-first, no DB. Referral codes are deterministic SHA-256 hashes of email so we don't need to store the mapping.
>
> The product opens in late May. The waitlist is live now.
>
> I'd genuinely love feedback on:
> 1. The encryption story (what would you want to see explained on the landing page?)
> 2. The pricing assumption — leaning free + optional paid power features
> 3. The "no AI" positioning — is that a feature or a limitation in 2026?
>
> Thanks for taking a look.

> **HN tactical notes:**
> - Don't ask for upvotes anywhere on the internet — HN detects voting rings.
> - Reply to every comment within an hour during the first 4 hours.
> - Don't be defensive. HN respects authors who say "you're right, I hadn't thought of that."

---

## BetaList

> https://betalist.com/submit · Free submission. Takes 2-4 weeks for them to review and post. Submit ~3 weeks before your target launch date.

**Tagline:**
> A quieter place to think — encrypted journaling without the noise.

**Description (~500 char):**
> Meethril is a quiet, end-to-end encrypted journaling web app for people who are tired of being optimized. Write entries with words, doodles, photos, and songs. Seal letters until a future date — to yourself, a friend, or an anonymous stranger across the world. Build scrapbooks for the things words alone can't carry. Old entries return when you need them, themed in your own way. No streaks, no daily reminders, no AI generating your thoughts. Just a soft place to put what the day asked of you.

**Categories:** Productivity, Writing, Privacy, Lifestyle

**Screenshot:** Hero section of meethril.com (full-page screenshot, ~1600w)

---

## Indie Hackers

> Post in the "Show IH" section + a longer-form post in your milestone feed.

**Show IH title:**
> Show IH: Meethril – encrypted journaling for people tired of being optimized

**Show IH body:**
> Hey IH. After ~4 months of solo nights-and-weekends building, I'm opening the waitlist for Meethril today.
>
> **What it is:** a quiet, end-to-end encrypted journaling app. No streaks, no daily reminders, no AI features. Letters you can seal until a future date. Scrapbooks. Theme-driven memory.
>
> **What I'm trying to figure out:**
>
> 1. How to reach the journaling/slow-living crowd without sounding like every other "self-care" app on the App Store. (Voice has been the hardest part.)
> 2. Pricing — leaning free + optional paid for cloud storage / advanced encryption options. Anyone in the wellness/journaling space have data on what converts?
> 3. Pre-launch waitlist → product launch conversion. Currently relying on shipping a referral mechanic + cold outreach to journaling creators. Open to ideas.
>
> **Stack:** Next.js 16, Resend, Tailwind, Framer Motion. No DB yet — Resend's contacts API is the only store.
>
> Site: meethril.com
>
> Happy to answer anything in the comments. ♥

**Milestone post (after 100 / 500 / 1000 signups):**
> Hit 100/500/1000 waitlist signups for Meethril today. Here's what worked, what didn't, and what I'd do differently. [longer breakdown — write this when you actually hit the milestone, with real numbers]

---

## Less obvious places (worth ~5-15 min each to submit)

| Site | URL | Why it fits |
|---|---|---|
| **Tiny Apps** | tinyapps.org | Quiet web tools — fits the meethril ethos |
| **There's an AI for That** | theresanaiforthat.com | Skip — Meethril is explicitly anti-AI |
| **Launching Next** | launchingnext.com | Free startup directory |
| **Startup Stash** | startupstash.com | Submit to "writing" + "wellness" categories |
| **Sideprojectors** | sideprojectors.com | Smaller community, supportive |
| **r/SideProject** | reddit.com/r/SideProject | (already in platform-content.md) |
| **Lobsters** (HN-adjacent) | lobste.rs | Invite-only — skip unless you have an invite |
| **Hacker News "Ask HN: What are you working on?"** | weekly thread | Free, polite, drop a line |

---

## Submission checklist (do this before posting any of the above)

- [ ] Site loads under 2 seconds on mobile (verified — we just shipped the perf fix)
- [ ] OG image set (so links look good when shared) — check `src/app/layout.tsx`
- [ ] favicon shows up in browser tabs
- [ ] Welcome email actually sends (test with your own email)
- [ ] Unsubscribe link works
- [ ] No console errors on production build
- [ ] meethril.com resolves with HTTPS, no certificate warnings
- [ ] You have a Twitter/X handle ready to reply on
- [ ] You have a personal email separate from hello@meethril.com for journalist replies
