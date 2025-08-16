# NadiStuti - A Tribute to Holy Indian Rivers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-orange)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-blue)](https://tailwindcss.com)

## 🌊 About

NadiStuti is an open-source cultural and educational project dedicated to preserving and celebrating the heritage of India's sacred rivers through the ancient Rig Veda hymn 10.75 (Nadi Stuti). This comprehensive website combines modern web technologies with traditional cultural content to create an immersive experience for learning about India's holy rivers.

## ✨ Features

- **Interactive River Map**: Explore India's sacred rivers with an interactive SVG map
- **Comprehensive River Information**: Detailed pages for each of the 10 holy rivers
- **Sanskrit Audio Player**: Listen to traditional pronunciation of Rig Veda hymns
- **Multi-language Support**: Content available in major Indian languages
- **Mobile Apps & Games**: Educational tools for learning about sacred rivers
- **Community Platform**: Connect with fellow devotees and scholars
- **Donation System**: Support the preservation of cultural heritage
- **PDF Downloads**: Beautifully formatted documents for offline reading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nadi-stuti/website.git
cd website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## 🏗️ Project Structure

```
nadistuti/
├── public/
│   ├── images/          # River images and cultural photos
│   ├── audio/           # Sanskrit recitations and river sounds
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/
│   │   ├── events.json
│   │   └── products.tsx
│   ├── hooks/            # custom React hooks
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── translations.ts
│   │   └── translations/  # per-section translation files (home, hymn, rivers, etc.)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── middleware.ts
│   ├── pages/            # routes / localized site structure
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── api/
│   │   │   ├── book-event.json.ts
│   │   │   ├── download-hymn-pdf.ts
│   │   │   ├── events.json.ts
│   │   │   └── download-river-pdf/
│   │   │       └── [river].ts
│   │   ├── en/ hi/ as/ bn/ gu/ kn/ ml/ mr/ or/ pa/ sa/ ta/ te/   # localized pages & route trees
│   │   └── (localized route files: index.astro, community.astro, donate.astro, events, rivers, shop, study-hub, watch, etc.)
│   ├── scripts/
│   │   └── languageHandler.ts
│   ├── stores/           # client state stores
│   ├── styles/
│   │   ├── components.css
│   │   └── global.css
│   ├── types/
│   │   └── shop.ts
│   └── utils/
│       └── languagePreference.ts
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🗂️ src/pages/en (English routes)

```
src/pages/en/
├── 404.astro
├── apps.astro
├── community.astro
├── donate.astro
├── events/
│   ├── events.astro
│   └── [eventId].astro
├── index.astro
├── rivers/
│   ├── brahmaputra.astro
│   ├── ganga.astro
│   ├── godavari.astro
│   ├── indus.astro
│   ├── kaveri.astro
│   ├── krishna.astro
│   ├── mahanadi.astro
│   ├── narmada.astro
│   ├── saraswati.astro
│   └── yamuna.astro
├── rivers.astro
├── shop/
│   ├── books.astro
│   ├── clothing.astro
│   ├── home.astro
│   ├── idols.astro
│   ├── jewelry.astro
│   ├── pooja.astro
│   ├── products.astro
│   ├── sellers.astro
│   └── stores.astro
├── shop.astro
├── study-hub/
│   ├── geography.astro
│   ├── handbooks.astro
│   ├── historical.astro
│   ├── holy-calendar.astro
│   ├── multimedia.astro
│   ├── research.astro
│   ├── rituals.astro
│   ├── scriptures.astro
│   └── slideshows.astro
├── study-hub.astro
└── watch.astro
```

## 🛠️ Components

```
├──src/
│   ├── components/      # Reusable UI components
│   │   ├── AudioPlayer.tsx
│   │   ├── DonationForm.tsx
│   │   ├── EventBookingForm.tsx
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── InteractiveMap.tsx
│   │   ├── LanguageSelector.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── LanguageSwitcher.tsx
│   │   ├── SubmitEventForm.tsx
│   │   ├── events/       # event-related components
│   │   │   ├── BookingSection.tsx
│   │   │   ├── CommunityEvents.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventDetailPage.tsx
│   │   │   ├── EventHero.tsx
│   │   │   ├── EventsGrid.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   ├── FeaturedEvents.tsx
│   │   │   └── PastEventsCarousel.tsx
│   │   └── shop/         # shop UI components
│   │       ├── CartSidebar.tsx
│   │       ├── CategoryGrid.tsx
│   │       ├── ProductCard.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── SearchAndFilters.tsx
│   │       └── ShopContainer.tsx

```

## 🗂️ src/i18n/translations

```
src/i18n/
├── index.ts                # i18n entry: init locale, helper functions & exports
├── translations.ts         # shared types / aggregated export of all translations
└── translations/           # per-section translation modules (organized by page/feature)
    ├── index.ts            # imports and re-exports module map used by the app
    ├── 404.ts              # strings for 404 page
    ├── all-rivers-content.ts # common copy used across individual river pages
    ├── community.ts        # community page translations
    ├── events.ts           # events pages and labels
    ├── ganga-content.ts    # Ganga-specific content (example of river-specific file)
    ├── home.ts             # home page strings and hero text
    ├── hymn.ts             # hymn / scripture related strings
    ├── mission.ts          # mission / about page strings
    ├── navigation.ts       # site navigation labels and route names
    ├── river-content.ts    # per-river content structure (shared schema)
    ├── river-descriptions.ts # descriptive paragraphs for rivers
    ├── river-names.ts      # localized river names mapping
    ├── rivers.ts           # rivers listing page / overview copy
    ├── shop.ts             # shop UI & category strings
    ├── studyhub.ts         # study-hub section strings
    ├── ui.ts               # generic UI strings (buttons, form labels, errors)
    └── watch.ts            # watch / multimedia page strings
```

Notes:

- index.ts and translations.ts are the runtime entry points — they load/merge per-language copies of the files above.
- The translations/ folder holds modular, per-section files to keep localization maintainable and reusable across localized route trees.

## 🌍 Sacred Rivers Covered

1. **Ganga (गङ्गा)** - The most sacred river of India
2. **Yamuna (यमुना)** - Beloved river of Lord Krishna
3. **Saraswati (सरस्वती)** - The mystical river of knowledge
4. **Krishna (कृष्णा)** - Major river of South India
5. **Kaveri (कावेरी)** - The Ganga of the South
6. **Godavari (गोदावरी)** - Longest river in South India
7. **Brahmaputra (ब्रह्मपुत्र)** - Son of Brahma
8. **Narmada (नर्मदा)** - One of the seven sacred rivers
9. **Indus (सिन्धु)** - The river that gave India its name
10. **Mahanadi (महानदी)** - Great river of Eastern India

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Interactive Components**: [React](https://reactjs.org) - For dynamic UI elements
- **Icons**: [Lucide React](https://lucide.dev) - Beautiful & consistent icons
- **Fonts**: [Noto Sans Devanagari](https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari) - For Sanskrit text
- **Deployment**: [Netlify](https://netlify.com), or any static hosting

## 🤝 Contributing

We welcome contributions from developers, scholars, cultural enthusiasts, and anyone passionate about preserving India's cultural heritage!

### Ways to Contribute

1. **Code Contributions**

   - Bug fixes and improvements
   - New features and enhancements
   - Performance optimizations
   - Accessibility improvements

2. **Content Contributions**

   - River information and research
   - Sanskrit translations and pronunciations
   - Cultural and historical context
   - Images and multimedia content

3. **Language Translations**

   - Hindi, Tamil, Telugu, Kannada, Malayalam
   - Bengali, Gujarati, Marathi, Punjabi
   - Other regional languages

4. **Community Support**
   - Answer questions in discussions
   - Help with documentation
   - Share the project with others

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Use TypeScript for React components
- Follow Astro best practices for static content
- Use Tailwind CSS for styling
- Ensure accessibility compliance (WCAG 2.1 AA)
- Add proper SEO meta tags
- Include proper error handling

## 📱 Mobile Apps

We're developing companion mobile apps for iOS and Android:

- **River Quiz App** - Test your knowledge about sacred rivers
- **Virtual Pilgrimage** - 360° experiences of sacred sites
- **Sanskrit Learning** - Learn river names and pronunciations
- **River Sounds** - Meditation and relaxation app

## 🌐 Community

Join our growing community of devotees, scholars, and cultural enthusiasts:

- **Discord**: [discord.gg/nadistuti](https://discord.gg/nadistuti)
- **WhatsApp**: [chat.whatsapp.com/nadistuti](https://chat.whatsapp.com/KNCtYWiR6D856Yaup7iRZ9)
- **Telegram**: [t.me/nadistuti](https://t.me/nadistuti)
- **Reddit**: [r/nadistuti](https://reddit.com/r/nadistuti)
- **YouTube**: [@nadistuti](https://youtube.com/@nadistuti)

## 💝 Support the Project

NadiStuti is a labor of love and cultural preservation. Your support helps us:

- Maintain and improve the website
- Develop new educational content
- Create mobile applications
- Translate content into more languages
- Organize community events

**Ways to Support:**

- 🌟 Star this repository
- 🔄 Share with friends and family
- 💰 [Make a donation](https://nadistuti.com/donate)
- 🤝 Contribute code or content
- 📢 Spread awareness on social media

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rig Veda** - The ancient source of the Nadi Stuti hymn
- **Sanskrit Scholars** - For translations and cultural context
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - Everyone who helps preserve this cultural heritage
- **Devotees Worldwide** - For keeping the tradition alive

## 📞 Contact

- **Website**: [nadistuti.com](https://nadistuti.com)
- **Email**: [contact@nadistuti.com](mailto:contact@nadistuti.com)
- **GitHub**: [github.com/nadi-stuti](https://github.com/nadi-stuti)

---

**"इमं मे गङ्गे यमुने सरस्वति शुतुद्रि स्तोमं सचता परुष्ण्या"**

_"Listen to this my praise, O Ganga, Yamuna, Saraswati..."_

Made with ❤️ for preserving India's sacred river heritage
