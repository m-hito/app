import Link from "next/link";
import { systems, getFeaturedSystem, siteConfig } from "@/lib/systems";
import SystemCard from "@/components/SystemCard";
import AdSlot from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const featured = getFeaturedSystem();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section — Featured System */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Roblox Systems Hub
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
            Professional, open-source Roblox development systems. Movement, NPC
            AI, Combat, and more — ready to drop into your game.
          </p>
        </div>

        {/* Featured System Card */}
        <Link
          href={`/systems/${featured.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 md:flex-row"
        >
          {/* Featured gradient */}
          <div
            className="flex min-h-[220px] items-center justify-center md:w-2/5"
            style={{
              background: `linear-gradient(135deg, ${featured.gradientFrom}, ${featured.gradientTo})`,
            }}
          >
            <div className="text-center">
              <span className="text-8xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110 inline-block">
                {featured.icon}
              </span>
              <div className="mt-3">
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  ⭐ Featured
                </Badge>
              </div>
            </div>
          </div>

          {/* Featured info */}
          <div className="flex flex-1 flex-col justify-center p-8">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {(featured.tags || []).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              {featured.title}
            </h2>
            <p className="mb-4 text-base text-slate-400 leading-relaxed">
              {featured.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300 transition-all group-hover:bg-purple-500/30">
                View System →
              </span>
              <span className="text-xs text-slate-500">
                {featured.waitTimeSeconds}s to unlock
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* All Systems Grid */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              All Systems
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {systems.length} systems available
            </p>
          </div>
          <a
            href={siteConfig.allSystemsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-2.5 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/20 hover:text-purple-200"
          >
            🔥 Get All {systems.length}+ Systems
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, i) => (
            <SystemCard key={system.slug} system={system} index={i} />
          ))}
        </div>
      </section>

      {/* Ad Slot */}
      <section className="mb-12">
        <AdSlot />
      </section>
    </div>
  );
}
