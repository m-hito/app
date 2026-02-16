// ============================================================
// SYSTEMS CONFIG - Edit this file to add/modify systems
// ============================================================

export const siteConfig = {
  name: "Roblox Systems Hub",
  description: "Professional Roblox development systems — Movement, NPC AI, Combat, and more.",
  plausibleDomain: "yourdomain.io", // Change this to your domain for Plausible analytics
  allSystemsUrl: "https://ouo.io/MrWrM2",
};

export const systems = [
  {
    slug: "movement-system",
    title: "Roblox NPC Movement System v1.0",
    displayName: "Movement System",
    description:
      "Give any NPC movement scales up to 100s of NPCs, make them combat NPCs yourself — blueprint is ready.",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6366F1",
    icon: "🏃",
    devNotes: "https://github.com/m-hito/BrawlDevNotes#movement-system",
    repoUrl: "https://ouo.io/pBHIkz",
    ytVideo: "https://youtube.com/watch?v=movement-tutorial",
    waitTimeSeconds: 15,
    tags: ["movement", "npc", "pathfinding"],
    brawlNotes:
      "BrawlDev: Give NPC's tool, use humanoid method to activate it and make them combat NPCs",
    featured: false,
  },
  {
    slug: "npc-factory",
    title: "Advanced Roblox NPC Factory v1.0",
    displayName: "NPC Factory",
    description:
      "Spawn NPCs with pathfinding, combat AI, squad behavior — production-ready system.",
    gradientFrom: "#EF4444",
    gradientTo: "#F97316",
    icon: "🤖",
    devNotes: "https://github.com/m-hito/BrawlDevNotes#npc-factory",
    repoUrl: "https://ouo.io/MrWrM2",
    ytVideo: "https://youtube.com/watch?v=npc-tutorial",
    waitTimeSeconds: 12,
    tags: ["npc", "ai", "pathfinding", "squad"],
    brawlNotes: "BrawlDev: Use CollectionService for NPC tagging",
    featured: false,
  },
  {
    slug: "combat-system",
    title: "Advanced Roblox Combat System v1.0",
    displayName: "Combat System",
    description:
      "5-combo modular combat system with state handling — competitive-ready.",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    icon: "⚔️",
    thumbnail: "https://i.postimg.cc/yYW9HHk4/Thumbnail-Poison.png",
    devNotes: "https://github.com/m-hito/BrawlDevNotes#combat-system",
    repoUrl: "https://ouo.io/j1lnPH",
    ytVideo: "https://youtube.com/watch?v=combat-tutorial",
    waitTimeSeconds: 12,
    tags: ["combat", "pvp", "modular"],
    brawlNotes: "Adding airborne combat in combat system v2",
    featured: true,
  },
  {
  slug: "wave-system",
  title: "ECS Wave System v1.0",
  displayName: "Wave System", 
  description: "Modular ECS wave spawner with scaling difficulty, factory pattern, and data-driven progression.",
  gradientFrom: "#10B981",
  gradientTo: "#059669", 
  icon: "🌊",
  thumbnail: "https://media.craiyon.com/2025-10-05/KJYaL92KRJiwuymNfwK6ZA.webp",

  devNotes: "https://github.com/m-hito/BrawlDevNotes#wave-system",
  repoUrl: "https://ouo.io/6pHQfv",
  ytVideo: "https://youtube.com/watch?v=your-wave-tutorial",
  waitTimeSeconds: 18,
  tags: ["ecs", "waves", "spawner", "progression"],
  brawlNotes: "BrawlDev: Modular factory + state service architecture",
  featured: false,
},

];


export function getSystemBySlug(slug) {
  return systems.find((s) => s.slug === slug) || null;
}

export function getFeaturedSystem() {
  return systems.find((s) => s.featured) || systems[0];
}
