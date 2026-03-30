# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Green Nano Thai** is a static HTML website for a pest control company in Chiang Mai, Thailand.

- **URL:** https://www.greennanothai.com/
- **Type:** Static HTML site (no build process, no dynamic backend)
- **Hosting:** Cloudflare Pages (deployed from GitHub)
- **Tech Stack:** HTML5, CSS3, vanilla JavaScript (minimal)
- **Performance Target:** Lighthouse 90+ on all metrics

---

## File Structure

```
/greennanothai
  /index.html              # Homepage (root)
  /pages                   # Subpages (flat structure)
    /*.html                # 8 subpages (about, services, portfolio, etc.)
  /images                  # All images in WebP format
    /*.webp                # Semantic naming (e.g., hero-banner.webp)
  /css                     # Stylesheets
    /style.css             # Main unified stylesheet
    /*.css                 # Legacy CSS files (should consolidate)
  /scripts                 # JavaScript dependencies
    /main.js               # Custom JavaScript
    /*.js                  # Third-party libs (Splide, GLightbox, etc.)
  /sitemap.xml             # SEO sitemap
  /robots.txt              # Crawler permissions
  /wrangler.jsonc          # Cloudflare Pages config
  /_raw/                   # Backup of original website export (reference only, not active)
  /stitch/                 # Working directory (gitignored, will be referenced in future work)
```

---

## Key Concepts

### URL Structure
- **Home:** `/` or `/index.html`
- **Subpages:** `/pages/[pagename].html`

### Relative Path Rules
**From `index.html` (root):**
```html
<a href="pages/about.html">     <!-- Other pages -->
<img src="images/hero.webp">    <!-- Images -->
<link href="css/style.css">     <!-- CSS -->
```

**From `/pages/*.html` (inner pages):**
```html
<a href="../index.html">        <!-- Home -->
<a href="about.html">           <!-- Other pages in /pages/ -->
<img src="../images/hero.webp"> <!-- Images -->
<link href="../css/style.css">  <!-- CSS -->
```

### Image Naming
Images use **semantic naming** in WebP format:
- ✅ `hero-banner-greennanothai.webp`
- ✅ `pest-control-icon-shield.webp`
- ❌ `ico_01_5189e9.png`

---

## Common Development Commands

### Local Testing
No build process needed. Open files directly in a browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or use a local HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

### Check for Broken Links
```bash
# Use a link checker (install if needed)
npm install -g broken-link-checker

# Run from project root
blc http://localhost:8000 -r
```

### Validate HTML
```bash
# Use the W3C validator (online)
# https://validator.w3.org/

# Or use a local tool
npm install -g html-validate
html-validate "pages/*.html"
```

### Image Optimization
The project includes an automated image conversion pipeline:
```bash
# Convert images to WebP and rename semantically
python execute-rename.py
```

This:
- Converts all images to WebP format
- Renames files semantically (e.g., `ico_01_5189e9.png` → `pest-control-icon.webp`)
- Updates all HTML references automatically
- Deletes old files and duplicates

**Note:** Run this only when you have new images to optimize. The pipeline is idempotent—it skips already-processed files.

### CSS Consolidation (Future)
The project currently has multiple CSS files (legacy from the original export). Future refactoring should:
1. Merge all CSS from `css/*.css` into `css/style.css`
2. Update `index.html` to reference only `style.css`
3. Update `pages/*.html` to reference only `../css/style.css`
4. Delete unused `css/*.css` files

---

## Pre-Deployment Checklist

Before committing and pushing to production, verify:

- [ ] **Images:** All images are WebP format with semantic names
- [ ] **Alt Text:** Every image has descriptive `alt` attribute
- [ ] **Internal Links:** All page-to-page links work correctly
- [ ] **Relative Paths:** All CSS, script, and image paths are correct from both root and `/pages/`
- [ ] **Meta Tags:** Each page has unique `<title>` and `<meta name="description">`
- [ ] **Canonical URLs:** Each page has correct `<link rel="canonical">`
- [ ] **hreflang Tags:** English and Thai pages linked via `<link rel="alternate" hreflang>`
- [ ] **Schema.org Markup:** Homepage includes LocalBusiness schema (check `index.html`)
- [ ] **Mobile Responsive:** Test on 375px, 768px, and 1200px widths
- [ ] **Performance:** Run Lighthouse audit, target 90+ on all metrics
- [ ] **Lighthouse Checks:**
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 90+
- [ ] **Console Errors:** No errors in browser developer tools (F12)
- [ ] **External Links:** All external links have `target="_blank"` and `rel="noopener"`

---

## SEO Implementation

Every page requires these meta tags in `<head>`:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Unique Page Title (50-60 chars)</title>
<meta name="description" content="Unique description (140-155 chars)">
<link rel="canonical" href="https://www.greennanothai.com/pages/about.html">

<!-- Hreflang for English/Thai pages -->
<link rel="alternate" hreflang="en" href="https://www.greennanothai.com/pages/about.html" />
<link rel="alternate" hreflang="th" href="https://www.greennanothai.com/pages/thai.html" />
```

### Content Requirements
- One H1 per page (unique, descriptive)
- Hierarchical headings (H2, H3, no skipping levels)
- Alt text on every image (descriptive, naturally keyword-aware)
- Internal links between related pages
- External links: `target="_blank" rel="noopener"`

### SEO Files
- **`sitemap.xml`** — Auto-update when adding pages
- **`robots.txt`** — Standard directives (already configured)

---

## Architecture Notes

### No CSS Framework
The site uses custom CSS only. No utility frameworks (Tailwind, Bootstrap) are used. This keeps the bundle small and gives full design control.

### Minimal JavaScript
JavaScript files are mostly third-party libraries for specific features:
- **Splide:** Carousel/slider functionality
- **GLightbox:** Image lightbox/gallery
- **Custom JS:** Minimal enhancements in `scripts/main.js`

Third-party scripts should defer loading:
```html
<script src="scripts/main.js" defer></script>
```

### Available Animation Library
A comprehensive **43+ production-ready animation library** is available locally at:
```
C:\Users\Shayne\Local-Components\animation-library
```

This library includes:
- Text animations (reveal, typewriter, glitch, color glow)
- Directional animations (slide, fade, zoom in all directions)
- Attention-seeking effects (bounce, pulse, shake, flip, rotate)
- Mouse tracking (spotlight effect, custom cursors)
- Background effects (grid animation, gradient shifts, particles)
- Interactive elements (button ripple, tab switching, tooltips)
- Advanced effects (parallax, morphing SVG, canvas visuals)

All animations use vanilla JavaScript with no external dependencies. Copy the relevant CSS classes to HTML elements for instant animation.

### CSS Architecture
- **`css/style.css`** — Main stylesheet (should be the only CSS file referenced)
- Legacy `css/*.css` files are present but should be consolidated into `style.css`

### Image Strategy
- **Format:** WebP (primary), PNG (if transparency needed)
- **Quality:** 70–85% for WebP compression
- **Sizes:**
  - Hero images: 1200px wide minimum
  - Content images: 600–1000px wide
  - Icons: 200–400px wide
- **Lazy Loading:** Add `loading="lazy"` to below-fold images
- **Responsive:** Use CSS media queries; no `srcset` needed for this site

---

## Deployment Workflow

### GitHub to Cloudflare Pages

1. Make changes locally
2. Test thoroughly (see Pre-Deployment Checklist)
3. Commit and push to `main` branch on GitHub
4. Cloudflare Pages webhook fires automatically
5. Build: Static files served as-is (no build step)
6. Deploy: Live within 1 minute

### Branch Strategy
- **`main`** — Production (live site)
- Feature branches optional for major updates
- Pull requests recommended for review before merge

### Cloudflare Configuration
- **Config file:** `wrangler.jsonc`
- **Assets directory:** `./` (entire root directory)
- **Caching:** Automatic for all static assets
- **SSL/TLS:** Full SSL, HTTPS enforced

---

## Maintenance Notes

### Performance & Monitoring
- **Lighthouse Audit:** Run quarterly
- **Broken Links:** Check quarterly
- **Analytics:** Monitor via Cloudflare Analytics or GA4 (if enabled)
- **SSL/Security:** Cloudflare handles automatically

### Content Updates
- Update pages locally in Git
- Commit when perfect
- Push to `main` to deploy

### Backup Strategy
- Git repository is the primary version control
- Cloudflare keeps 30-day deployment history
- Download static files periodically for local backup

---

## Editing Specific Content

### To add a new page:
1. Create `/pages/new-page.html` (copy structure from existing page)
2. Update links in navigation (`<header>`, `<nav>`, `<footer>`)
3. Update `/sitemap.xml` with new page URL
4. Add hreflang tags if bilingual
5. Update internal linking on related pages
6. Test all links work
7. Run Lighthouse (target 90+)
8. Commit and push

### To update images:
1. Save new WebP images to `/images/` with semantic names
2. Update HTML `<img>` tags with new filenames
3. Test on all pages
4. Commit and push

### To modify CSS:
1. Edit `/css/style.css`
2. Test on mobile (375px), tablet (768px), desktop (1200px+)
3. Run Lighthouse to ensure performance not impacted
4. Commit and push

### To update meta tags (SEO):
1. Edit `<head>` section in relevant HTML files
2. Ensure each page has unique `<title>` and `<description>`
3. Update canonical URLs
4. Verify hreflang tags for multi-language pages
5. Test with SEO inspection tools
6. Commit and push

---

## Performance Targets

### File Size Budget
- **HTML:** < 50 KB per page
- **CSS:** < 30 KB (all pages combined)
- **JavaScript:** < 20 KB (all pages combined)
- **Images:** < 500 KB per page
- **Total:** < 700 KB per page load

### Lighthouse Metrics
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3.5s

---

## Security & Privacy

### SSL/HTTPS
- Enforced via Cloudflare (Full SSL mode)
- HTTP redirects to HTTPS automatically
- HSTS header enabled
- Certificate auto-renewed

### Forms & Data
- No sensitive data stored in static files
- Contact form submissions via third-party service (if applicable)
- No user accounts or login system
- No cookies (unless GA4 enabled)

### External Links
All external links require:
```html
<a href="https://example.com" target="_blank" rel="noopener">Link</a>
```

---

## Troubleshooting

### Images not loading?
- Check relative paths (use `../` if in `/pages/`)
- Verify image files exist in `/images/`
- Ensure filename matches HTML `src` attribute exactly
- Check file extensions (.webp, not .png)

### CSS not loading?
- Check `<link>` href path (root: `css/style.css`, pages: `../css/style.css`)
- Browser cache: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check for typos in filename

### Links broken?
- Verify relative paths: `pages/about.html`, `../index.html`
- Check for `.html` extension in all internal links
- Test all pages in a local server

### Performance poor?
- Run Lighthouse audit (check for unoptimized images)
- Verify all images are WebP format
- Check image file sizes
- Ensure CSS/JS are minified if applicable

---

## Tools & Resources

### Recommended Browser Tools
- **Lighthouse** — Built into Chrome DevTools (F12)
- **WAVE** — Accessibility checker (browser extension)
- **Screaming Frog SEO Spider** — Link validation and SEO audit

### Online Validators
- **HTML:** https://validator.w3.org/
- **SEO:** https://search.google.com/search-console/
- **Lighthouse:** https://pagespeed.web.dev/

### Local Tools
```bash
# Install optional tools
npm install -g html-validate broken-link-checker

# Or use Python
python -m http.server 8000  # Local server
```

---

## Git Workflow

### Standard Commit
```bash
git add .
git commit -m "Add/update [feature]: [description]"
git push origin main
```

### Commit Message Conventions
- Feature: `Add [feature]: [description]`
- Fix: `Fix [issue]: [description]`
- Update: `Update [section]: [description]`
- Style: `Style [component]: [description]`

**Example:**
```bash
git commit -m "Add services page: pest control offerings"
git commit -m "Fix responsive layout on tablet screens"
git commit -m "Update footer contact information"
```

---

## Contact & Support

- **Site URL:** https://www.greennanothai.com/
- **Repository:** GitHub (main branch = production)
- **Hosting:** Cloudflare Pages
- **Deployment:** Automatic on push to `main`

For technical questions, refer to the documentation in `.md/` directory or contact the developer who built the site.

---

**Document Version:** 1.0
**Last Updated:** 29 Mar 2026
**Next Review:** 29 Mar 2027
