# SEO — what's done, what you need to do

## Already shipped on-site

- ✅ Keyword-rich title + meta description with "Meethril" repeated
- ✅ Canonical URL (`alternates.canonical`)
- ✅ `robots.txt` (auto-generated at `/robots.txt`)
- ✅ `sitemap.xml` (auto-generated at `/sitemap.xml`)
- ✅ Dynamic Open Graph image at `/opengraph-image` (auto-attached to OG + Twitter cards)
- ✅ JSON-LD structured data: Organization + WebSite + SoftwareApplication schemas
- ✅ Search Console verification hook (env-var driven — see below)

## What you do off-site (in priority order)

### 1. Google Search Console — 15 min, do today

This is the single most important thing for fixing "did you mean mithril".

1. Go to <https://search.google.com/search-console>
2. Add property → choose **URL prefix** → `https://meethril.com`
3. Choose verification method: **HTML tag**
4. Copy the `content="..."` value (just the value, not the full tag)
5. Add to your Vercel env: `GOOGLE_SITE_VERIFICATION=<that-value>`
6. Redeploy. Click "Verify" in Search Console.
7. Once verified, **submit your sitemap**: `Sitemaps` → enter `sitemap.xml` → Submit.
8. Use the **URL Inspection** tool on `https://meethril.com` → "Request Indexing".

This tells Google explicitly: "I own this site, here's its structure, please index it."

### 2. Bing Webmaster Tools — 10 min

Bing/DuckDuckGo/Brave search use Bing's index. ~15% of search traffic.

1. <https://www.bing.com/webmasters>
2. Add site → Import from Search Console (one click if you did step 1)
3. Submit sitemap: `https://meethril.com/sitemap.xml`

### 3. Wikidata entry — 30 min, do after first launch submission goes live

Wikidata feeds Google's Knowledge Graph. A Wikidata entry is one of the strongest "this is a real entity" signals you can give Google. Most disambiguation issues clear up within 4–8 weeks of having a Wikidata entry.

**Caveat:** Wikidata requires "notability" — you need at least 1–2 reliable references. Submit AFTER your Product Hunt or BetaList launch goes live (those count as references), not before.

See the draft in [`wikidata-draft.md`](./wikidata-draft.md). When ready: <https://www.wikidata.org/wiki/Special:NewItem>.

### 4. Brand bio consistency — 30 min

Google figures out brand entities from cross-platform consistency. Make these all match exactly:

- X / Twitter bio
- Instagram bio
- LinkedIn (personal page mentioning the project)
- GitHub repo description
- Threads bio
- Mastodon (if applicable)
- BlueSky bio

**Use this exact bio everywhere (≤160 char):**
> Meethril — a quieter place to think. Encrypted journaling, sealed letters, scrapbooks. Coming May 2026. meethril.com

### 5. Backlinks (already in launch plan)

Every submission in `launch-submissions.md` is a high-quality, do-follow backlink. After 5–10 of these go live, "did you mean mithril" goes away. Order matters less than getting them up at all.

### 6. Crunchbase / AngelList listing — 15 min

Even pre-launch, list the company on:
- <https://www.crunchbase.com/start/add-organization>
- <https://wellfound.com/jobs> (formerly AngelList)

Both are crawled heavily by Google and contribute to entity recognition.

## Things NOT to do

- ❌ **Don't buy backlinks.** Google detects link-spam patterns and penalizes the site. One blog network mention can tank you for 6 months.
- ❌ **Don't keyword-stuff the homepage.** "Meethril journaling app encrypted journal Meethril Meethril" reads as spam to both humans and crawlers.
- ❌ **Don't change the brand spelling later.** Every change resets entity recognition. "Meethril" is the brand. Stay with it.
- ❌ **Don't expect overnight results.** Realistic timeline:
  - Week 1: Indexed in Search Console
  - Week 2–4: Direct searches for "meethril.com" rank #1
  - Month 2–3: "meethril" stops triggering "did you mean mithril" (if backlinks land)
  - Month 6+: Knowledge Graph entry possible

## How to track if SEO is working

| Metric | Where to check | Target |
|---|---|---|
| Brand search position | Google Search Console → Performance → query "meethril" | Position 1 within 4 weeks |
| Indexed pages | Search Console → Coverage | 1+ (the homepage) within 2 weeks |
| Backlinks | <https://ahrefs.com/backlink-checker> (free tier) or Search Console → Links | 5+ within 8 weeks |
| Did-you-mean trigger | Manually search "meethril" on Google in incognito | Should NOT show "Did you mean mithril" by month 3 |

If by week 6 you're not at position 1 for direct "meethril" searches, the issue is likely indexing (not authority). Re-request indexing in Search Console.
