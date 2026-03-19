Question: this website was made in kiro with vibe coding as you can see there is alot of mismannaged code. 

I want to format this website in a well written and well managed codebase. 

I thin k looking at the requirement of this website which you can refer to by reading @README.md , this tech stack should be md files for content and astro as frontend. 

It is very important that this website should be in multiple indian languages (currently it supports 13 different languages) 

since the content of this website will be static with rare changes once a week sort of. So i think astro + md files are my best option. I will be hosting this website on netlify and put the code on github. 

Now you should do a deep dive and through research on astro + md techstack and make sure you get the latest documentation. 

Asnwer my questions and dont make any changes to codebase: 

1) What are the problamatic areas you see in the current code
2) what is the best way to structure code for multiple languages support
3) Is astro + md techstack best fot my requirement? 
4) How do you suggest i change the code step by step to make this a best migration?
5) i want to have best seo but currently the google web serach show the language selector for the website intead of the content of website. 
6) how can i make seo optimized for each languages so that it is the most available website on the search engines

---

Answer: This is a great project! Preserving cultural heritage like the Nadi Stuti hymn is a noble goal.

After reviewing your codebase, I can confirm that while the "vibe coding" got the site up and running, the current structure is indeed "mismanaged" and will be a nightmare to maintain long-term. You are currently duplicating the entire website code 13 times (once for each language), which is the main source of your problems.

Here is the deep dive analysis and the plan to fix it.

1) Problematic Areas in Current Code
Massive Code Duplication (The "13 Websites" Problem):
Issue: You have separate folders for each language (src/pages/en/, src/pages/hi/, etc.), and inside each folder, you have copied and pasted the entire .astro file.
Impact: If you want to change the color of a button or add a new section, you have to do it 13 times. This is error-prone and unmaintainable.
Hardcoded Logic inside Pages:
Issue: Inside files like src/pages/en/index.astro, there are huge blocks of conditional logic (e.g., currentLang === "hi" ? ... : ...).
Impact: This defeats the purpose of having separate folders. You are mixing "routing by folder" with "logic by condition," making the code messy and hard to read.
Root Page is a Barrier (SEO Killer):
Issue: Your src/pages/index.astro is just a "Language Selector" with no real content.
Impact: Google bots hit this page, see no content, and often stop there or get confused. This is why your SEO is suffering. Search engines prefer to land on content (e.g., /en/) immediately.
Content Locked in Code:
Issue: Your river descriptions and hymn translations are hardcoded inside .astro or .tsx files.
Impact: Non-technical contributors (translators) cannot help you easily because they would have to edit code.


2) Best Way to Structure Code for Multiple Languages
Since you are using Astro 5, you should use Astros Native i18n Routing and Content Collections.

Recommended Structure:

```
src/
├── content/                   <-- ALL text content lives here (Markdown/MDX)
│   ├── config.ts              <-- Define schemas (ensure data consistency)
│   ├── rivers/                <-- Content Collection for Rivers
│   │   ├── en/
│   │   │   └── ganga.md
│   │   ├── hi/
│   │   │   └── ganga.md
│   │   └── ...
│   └── homepage/              <-- Content for Home Page sections
│       ├── en.md
│       └── hi.md
├── i18n/                      <-- UI Strings (Buttons, Nav, Footer)
│   ├── ui.ts                  <-- JSON-like objects for small labels
│   └── utils.ts
├── pages/
│   └── [lang]/                <-- SINGLE dynamic folder for ALL languages
│       ├── index.astro        <-- One file serving all 13 homepages
│       └── rivers/
│           └── [slug].astro   <-- One file serving all 130+ river pages
└── astro.config.mjs           <-- Configure i18n here
```

3) Is Astro + MD Tech Stack Best?
Yes, absolutely.

Performance: Astro builds to static HTML (zero JavaScript for content), which is crucial for SEO and performance, especially on mobile networks in India.
Maintenance: Markdown (.md) is easy to edit. You can even use a CMS (like Decap CMS or Keystatic) later so translators can edit files without touching code.
Scalability: Adding a 14th language will just mean adding a new folder of .md files, not copying code.

4) Step-by-Step Migration Plan
Do not try to do this all at once. Here is the safe path:

Phase 1: Configuration & Foundation

Update astro.config.mjs: Enable the i18n configuration. Set defaultLocale: "en" and list all others.
Define Content Collections: Create src/content/config.ts to define the schema for a "River" (name, length, origin, description, etc.).
Phase 2: Content Extraction (The Heavy Lifting) 3. Create Markdown Files: Go through your existing src/pages/en/rivers/*.astro files and copy the text into src/content/rivers/en/*.md. Do the same for Hindi, etc. 4. Extract UI Strings: Move small text like "Read More", "Download PDF" into src/i18n/ui.ts.

Phase 3: Refactor Routing 5. Create Dynamic Pages: Create src/pages/[lang]/index.astro. Use getStaticPaths (or Astros i18n routing) to generate pages for all languages automatically. 6. Connect Data: In this new index file, fetch the content using getEntry('homepage', lang).

Phase 4: Cleanup 7. Delete Old Folders: Once the dynamic routes work, delete the src/pages/en, src/pages/hi, etc. folders.

5) Why Google Shows the Language Selector (SEO Issue)
Google sees https://nadistuti.com/ as the main page. Currently, that page contains:

No text content.
A list of buttons.
A JavaScript redirect (or meta refresh).
Google hates this. It considers it a "doorway page" or "thin content". It doesn't know which language version is the "real" one, so it indexes the selector itself.

6) How to Optimize SEO for Each Language
Automatic Redirect (Correctly):
Configure Astro to redirect / to /en/ (HTTP 302/301).
This forces Google to land on /en/ immediately, where it finds rich content.
Hreflang Tags (Critical):
You must include <link rel="alternate" hreflang="hi" href=".../hi/" /> tags in the <head> of every page.
Good News: Astro's i18n system generates these automatically if you use the default_api correctly.
Sitemap:
Ensure @astrojs/sitemap is configured to include all localized URLs.
Localized Metadata:
In your Markdown frontmatter, include a title and description in the target language. Your layout should inject these into the <meta> tags.

Ready to start?
I recommend we start by creating the Content Collection schema and migrating one language (English) of the River pages to see how it looks. Shall I begin with that?

---

Prompt: 
lets start small. Lets start with 2 languages (english and hindi) and on page homepage. Inside @src/pages create a new folder called migrate then create the best folder strcuture for it. create necessary md files and astro files for it. I want to see how it looks and test this page so that i can proceed with the complete migration of the project in step by step manner