# NadiStuti Website Migration: A Detailed Context and Architectural Plan

**Version: 2.0**
**Purpose:** This document is the single source of truth for the migration of the NadiStuti website. It serves as an exhaustive log of the project's background, the problems identified, the evolution of the technical strategy, and the final, agreed-upon plan. Its goal is to provide complete context to prevent repeated mistakes and ensure a smooth, efficient workflow.

---

## 1. The Starting Point: The Initial Request

The engagement began with a request to fix a TypeScript error within the `astro-cms` directory. The error was related to the configuration of Keystatic, a Git-based headless CMS. This initial request, however, did not encompass the true scope of the project.

## 2. The Flawed Initial Path: A History of Misunderstandings

A series of incorrect assumptions led to a flawed initial approach. It is crucial to document these missteps to avoid them in the future.

*   **Initial Misunderstanding:** The task was initially interpreted as a simple bug-fix within a self-contained Astro template (`astro-cms`). The broader context of the main `nadistuti` project was missed entirely.
*   **Incorrect File Creation:** Acting on this misunderstanding, several files and directories were incorrectly created in `astro-cms`. These included:
    *   `astro-cms/src/content/pages/`: An attempt to create content without a proper schema.
    *   `astro-cms/src/pages/[...lang]/` and `[lang].astro`: Incorrect attempts at dynamic routing based on outdated or incomplete knowledge.
    *   A `tailwind.config.mjs` file, which was later identified as unnecessary for a default Tailwind CSS v4 setup.
*   **Failure to Gather Context:** There were repeated failures to read the correct `README.md` file. An attempt was made to read a non-existent `readme.md` in `astro-cms`, while the crucial root `README.md` containing the project's true vision was ignored.

**This initial phase was a critical failure in analysis and served as a lesson: always understand the full project scope before taking action.**

## 3. The Turning Point: Defining the Real Goal

The project's true purpose was clarified: **to execute a methodical, step-by-step migration from the messy, auto-generated `nadistuti` website into the clean `astro-cms` project.**

This clarification led to a full stop of the previous approach and a complete re-evaluation of the strategy, beginning with a deep analysis of the original `nadistuti` codebase.

## 4. Deep Analysis of the `nadistuti` Project: The Core Problems

A thorough review of the `nadistuti` project's `src` directory revealed a fundamentally broken and unsustainable architecture.

*   **Core Problem: Massive File Duplication for Localization.** The site's structure was based on creating a complete copy of all page files for each of the 13 supported languages. This means that for every page, there are 13 separate `.astro` files.

*   **Concrete Example: The "Handbooks" Page.** The code for the "Handbooks" page exists in multiple locations with identical structure, as seen in these snippets:
    *   `src/pages/as/study-hub/handbooks.astro`
    *   `src/pages/mr/study-hub/handbooks.astro`
    *   `src/pages/or/study-hub/handbooks.astro`

    In all these files, the exact same HTML block is repeated verbatim:
    ```html
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="bg-white/10 rounded-lg p-4">
        <div class="text-2xl font-bold">6</div>
        <div class="text-indigo-100">Available Handbooks</div>
      </div>
      ...
    </div>
    ```
    This duplication makes adding a new language or changing a layout element a monumental task requiring dozens of file edits, which is inefficient and highly error-prone.

*   **Problem 2: Content Tightly Coupled with Layout.** All text, images, and other content are hard-coded directly into the `.astro` files. This means a developer is required for even the smallest content change, creating a bottleneck and making it impossible for non-technical users to manage the site.

*   **Conclusion:** The original project's architecture is a dead end. A complete refactoring is not just recommended; it is necessary for the project to succeed.

## 5. The Modern Architecture: The Corrected Migration Plan

Following the analysis, a new, modern architectural plan was developed based on the latest best practices for Astro, Keystatic, and Tailwind CSS (as of a hypothetical "December 2025" and Tailwind v4.1.12).

### Guiding Principles & Technologies

1.  **Astro Content Collections (The "Content Layer"):** This is the foundation of the new architecture. All content will be decoupled from the code and will reside in the `src/content/` directory. Astro will manage this content, providing type-safety via `zod` schemas defined in `src/content/config.ts`. This gives us a single source of truth for all content.

2.  **Keystatic as a GUI:** Keystatic will be configured to be a user-friendly graphical interface that reads from and writes **directly** to the Astro Content Collections in the `src/content/` directory. It becomes the "editor layer," not a separate system.

3.  **Astro Dynamic Routes:** The thousands of duplicated page files will be replaced by a single, intelligent dynamic route. This file will be responsible for fetching the correct content from the collections based on the URL and rendering it.

4.  **Simplified Tailwind CSS v4:** We will use the modern `@tailwindcss/vite` plugin. For our default setup, no `tailwind.config.mjs` is required. The configuration involves adding the plugin to `astro.config.mjs` and using `@import "tailwindcss";` in a global CSS file.

### Proposed Future Folder Structure

#### Content (`astro-cms/src/content/`)

*   **Purpose:** The single, type-safe source of truth for all website content.
*   **Key File:** `config.ts` - Defines schemas for all content collections (e.g., `pages`, `rivers`, `events`).
*   **Structure:** `collection/lang/slug.mdoc` (e.g., `pages/en/home.mdoc`).

```
astro-cms/src/content/
├── config.ts
└── pages/
    ├── en/
    │   ├── home.mdoc
    │   └── community.mdoc
    └── hi/
        ├── home.mdoc
        └── community.mdoc
```

#### Pages (`astro-cms/src/pages/`)

*   **Purpose:** To handle routing and rendering, keeping presentational logic separate from content.
*   **Key Files:**
    *   `[lang]/[...slug].astro`: The single dynamic route that will render every page from the `pages` content collection.
    *   `index.astro`: A root page, likely to handle language detection and redirection to a default like `/en/home`.
    *   `admin/[[...page]].astro`: The route that serves the Keystatic admin dashboard.

```
astro-cms/src/pages/
├── [lang]/
│   └── [...slug].astro
├── admin/
│   └── [[...page]].astro
└── index.astro
```

## 6. Immediate Next Steps

1.  **Clean Slate:** The absolute first priority is to delete all previously created "bad files" from the `astro-cms` directory to reset the environment to a known-good state. This includes:
    *   The entire `astro-cms/src/content/pages/` directory.
    *   Any routing files in `astro-cms/src/pages/` such as `[...lang]/`, `[lang].astro`, and any previous versions of `[lang]/[...slug].astro`.
2.  **Establish Context:** This `migration_context.md` file is the result of that process.
3.  **Resume Migration:** When work resumes, the first **active** step will be to implement the modern architecture outlined in Section 5, starting with the creation of the Astro Content Collection schema at `astro-cms/src/content/config.ts`.
