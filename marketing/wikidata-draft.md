# Wikidata Entry Draft — Meethril

> **When to submit:** After your first launch submission goes live (Product Hunt, BetaList, Indie Hackers, or a press mention). Wikidata requires "notability" — at least 1–2 reliable references. Pre-launch, the entry will be deleted.
>
> **Where to submit:** <https://www.wikidata.org/wiki/Special:NewItem>

## Suggested label & description

| Field | Value |
|---|---|
| **Label (English)** | `Meethril` |
| **Description (English)** | `journaling web application` |
| **Aliases** | `meethril`, `Meethril App`, `meethril.com` |

## Statements to add

| Property | Value | Notes |
|---|---|---|
| `instance of` (P31) | `software application` (Q166142) | Or `web application` (Q193424) if available |
| `genre` (P136) | `journaling software` — search for an existing item, otherwise leave blank | |
| `official website` (P856) | `https://meethril.com` | Important — main entity link |
| `inception` (P571) | `2026-05` (just month-precision) | The "from" date |
| `developer` (P178) | Your name (create a Wikidata item for yourself if needed, or skip) | Optional |
| `country of origin` (P495) | (your country, e.g. `India` Q668) | Optional |
| `programming language` (P277) | `TypeScript` (Q978185), `JavaScript` (Q2005) | Optional but useful |
| `software engine` (P408) | `Next.js` (Q42820329) | Optional |

## References to attach (this is what proves notability)

You need **at least one** of these for the entry to survive moderation:

- [ ] Product Hunt page URL (after your PH launch goes live)
- [ ] BetaList listing URL
- [ ] Indie Hackers Show IH post URL
- [ ] Hacker News Show HN thread (if it gets > 5 upvotes)
- [ ] Any press mention or independent blog post
- [ ] TechCrunch / The Verge / etc. — if you ever land coverage

Add references via the "Add reference" button under each statement. Use:
- "Stated in" (P248) — the source name
- "Reference URL" (P854) — the URL
- "Retrieved" (P813) — today's date

## Step-by-step submission

1. Go to <https://www.wikidata.org/w/index.php?title=Special:CreateAccount> and create a Wikidata account if you don't have one
2. Visit <https://www.wikidata.org/wiki/Special:NewItem>
3. Fill in **Label** = `Meethril`, **Description** = `journaling web application`, **Aliases** = `meethril`
4. Click "Create"
5. On the new item page, click "Add statement" — add the statements from the table above
6. For EACH statement, click "Add reference" and link to a real source (Product Hunt page, BetaList, etc.)
7. Save

## What happens after

- Within 48 hours, Wikidata moderators may review the entry. If they delete it, common reason is "no reliable references" — add more references and resubmit.
- Within 2–4 weeks, the entry starts feeding Google's Knowledge Graph.
- "Did you mean mithril" usually clears within 2 months of a live Wikidata entry.

## Anti-pattern (don't do this)

- Don't pay anyone to "create a Wikipedia article for your startup". This violates Wikipedia/Wikidata policy and gets the entry deleted permanently.
- Don't write the entry from your own account if you're the founder — disclosed conflict of interest is fine, but be transparent on the entry's talk page.
