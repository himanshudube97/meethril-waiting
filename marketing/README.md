# Meethril — Pre-launch Marketing Kit

Everything in this folder is **draft copy + outreach scripts** ready for you to send. Nothing here posts automatically — that's deliberate (mass auto-posting from a fresh brand account gets you shadow-banned within a week, and turns warm prospects cold).

## How to use this

1. **`platform-content.md`** — feed-ready posts for X, Instagram, TikTok, Reddit. Each is tuned to that platform's rules and voice.
2. **`launch-submissions.md`** — exact copy for Product Hunt, Show HN, BetaList, Indie Hackers. Submit on launch day; these convert.
3. **`cold-outreach.md`** — DM and email scripts for 4 different creator archetypes. Personalize the bracketed `[bits]` before sending.
4. **`influencer-list.md`** — curated list of real creators to reach out to (generated separately).
5. **`launch-checklist.md`** — week-by-week sequencing so you don't burn the list.

## Voice rules (don't violate these)

- **Lowercase** in body copy. Sentence case headlines OK.
- **Quiet, contemplative** — never hype, exclamation points, "🔥", "game-changer", "revolutionary".
- **Metaphor over claim** — "a quieter place to think" beats "the best journaling app".
- **No emojis except ♥** sparingly. Definitely no 🚀.
- **Short over polished** — aphorisms over paragraphs.

## The referral mechanic (already shipped)

After someone joins the waitlist, they see a personal share link `meethril.com/?ref=ABC123`. Their code is deterministically derived from their email — no DB needed. Backend logs `[waitlist] signup ref=ABC123` whenever someone signs up via a shared link, so you can `grep ref=` in your Vercel logs to see who's actually driving signups.

When you want real attribution (top referrers, leaderboard), upgrade by storing ref as a Resend custom contact field or moving to a KV store.
