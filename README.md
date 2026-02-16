
## 🔧 How this app works (for future me)

### 1) Add / edit systems (cards + pages)

File: `app-main/lib/systems.js`

Each system is just one object in the `systems` array:

```js
{
  slug: "wave-system",                     // URL: /systems/wave-system
  title: "ECS Wave System v1.0",           // Big title on detail page
  displayName: "Wave System",              // Card title
  description: "Short marketing description.",
  gradientFrom: "#10B981",                 // Fallback gradient start
  gradientTo: "#059669",                   // Fallback gradient end
  icon: "🌊",                              // Emoji on card
  thumbnail: "https://.../image.webp",     // Optional; if empty → uses gradient
  devNotes: "https://github.com/...#wave-system",
  repoUrl: "https://ouo.io/6pHQfv",        // GitHub / Model link (timer gated)
  ytVideo: "https://youtube.com/watch?v=...", // Tutorial video
  waitTimeSeconds: 18,                     // Timer duration before unlock
  tags: ["ecs", "waves", "spawner"],       // Badges on card + detail page
  brawlNotes: "Extra notes for devs.",
  featured: false                          // true = shows as main hero on home
}
```

- To make thumbnails use: ``https://postimg.cc`` (Image  --> link ) for thumbnails
- **Add new system** → copy an existing object, change the fields.  
- **Change order** → move objects up/down in the array.  
- **Change featured system** → set `featured: true` on exactly one object.

***

### 2) Where the UI pieces live

Folder: `app-main/components`

- `SystemCard.jsx`  
  - Renders each system card on the home page.  
  - Uses:
    - `thumbnail` if present  
    - otherwise `gradientFrom` / `gradientTo` + `icon`.  
  - If you want to change how cards look (layout, hover, text), edit here.

- `TimerCard.jsx`  
  - Handles the **countdown + unlock** logic.  
  - Props:
    - `waitTimeSeconds` from `systems.js`
    - Calls `onComplete()` when timer finishes to unlock repo link.  
  - To change timer behavior (shorter/longer, text, style), edit here.

- `AdSlot.jsx`  
  - Placeholder for ads.  
  - Replace the comment with real AdMaven / AdSense script when you’re ready.

***

### 3) System detail pages

Folder: `app-main/app/systems/[slug]/page.js`

- Uses `getSystemBySlug(slug)` from `systems.js`.  
- Shows:
  - Hero section (thumbnail or gradient)  
  - Tags  
  - Description  
  - Dev notes (`DevNotes` component)  
  - Timer (`TimerCard`)  
  - CTAs (GitHub, YouTube, All Systems)  
  - Expandable “All My Systems” grid  

You *almost never* need to touch this file unless you want to change layout or add new sections to the detail page.

***

### 4) Global config

Also in `app-main/lib/systems.js`:

```js
export const siteConfig = {
  name: "Roblox Systems Hub",
  description: "Professional Roblox development systems...",
  plausibleDomain: "yourdomain.io",    // Change when using Plausible
  allSystemsUrl: "https://ouo.io/MrWrM2" // Used by "View All Systems" CTA
};
```

Change this when you:

- Get a real domain  
- Change analytics domain  
- Change your “All Systems” master link

***
