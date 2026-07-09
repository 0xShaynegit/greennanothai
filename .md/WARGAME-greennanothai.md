# WARGAME: greennanothai
Date: 07/07/2026. See also C:\ZZZWebsites\.md\WARGAME-portfolio-seo.md.

## Mission and real state
Live at greennanothai.com (Cloudflare Pages via GitHub), 34 pages, stable since 09/04/2026. Head has JSON-LD/canonical/OG/desc but NO Cloudflare analytics beacon detected on index. Missing 404.html and _headers. Sitemap lists only 6 URLs against 34 pages: the biggest sitemap gap in the portfolio. node_modules sits inside the project folder.

## Posture
Execute: this site is flying blind (no analytics) and mostly invisible to crawlers (6/34 URLs mapped). Highest hygiene-fix payoff in the portfolio.

## Moves
1. Sitemap rebuild for all real pages. Fork: if the 28 unlisted pages are near-duplicates or template cruft (check first), prune instead of index.
2. Add the CF analytics beacon (verify against another site's token pattern; each site has its OWN token. [VARIABLE: this site's analytics token, from CF dashboard]).
3. Add 404.html and _headers.
4. Check whether node_modules is being deployed; add to ignore if so.

## Fragility
- 34 pages and a 6-URL sitemap suggests pages were added after launch without process. Whatever pipeline builds this site does not maintain its SEO artifacts; fix the habit, not just the file.

## Stretch
- Thai-language mirror if the customer base is domestic B2B. Judge much later; needs client input.

## Abort
- Do not deploy if the GitHub-to-Pages pipeline state is unclear; confirm which branch auto-deploys first.
