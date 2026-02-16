"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { systems, getSystemBySlug, siteConfig } from "@/lib/systems";
import TimerCard from "@/components/TimerCard";
import DevNotes from "@/components/DevNotes";
import AdSlot from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";

export default function SystemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const system = getSystemBySlug(slug);

  const [unlocked, setUnlocked] = useState(false);
  const [showOtherSystems, setShowOtherSystems] = useState(false);

  const handleTimerComplete = useCallback(() => {
    setUnlocked(true);
  }, []);

  // 404 handling
  if (!system) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-2 text-3xl font-bold text-white">System Not Found</h1>
        <p className="mb-6 text-slate-400">
          The system &quot;{slug}&quot; doesn&apos;t exist yet.
        </p>
        <Link
          href="/"
          className="rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-600"
        >
          ← Back to All Systems
        </Link>
      </div>
    );
  }

  const otherSystems = systems.filter((s) => s.slug !== system.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-purple-400"
        >
          <span>←</span>
          <span>All Systems</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mb-8">
        <div
          className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl md:h-80"
          style={{
            background: `linear-gradient(135deg, ${system.gradientFrom}, ${system.gradientTo})`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <span className="relative text-[100px] drop-shadow-2xl md:text-[120px]">
            {system.icon}
          </span>
        </div>

        {/* Title & description */}
        <div className="mt-8">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {(system.tags || []).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {system.title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-300 md:text-xl">
            {system.description}
          </p>
        </div>
      </section>

      {/* Developer Notes */}
      <section className="mb-8">
        <DevNotes
          devNotesUrl={system.devNotes}
          brawlNotes={system.brawlNotes}
        />
      </section>

      {/* Timer Card */}
      <section className="mb-8">
        <TimerCard
          waitTimeSeconds={system.waitTimeSeconds}
          displayName={system.displayName}
          onComplete={handleTimerComplete}
        />
      </section>

      {/* CTA Buttons */}
      <section className="mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* GitHub Repo */}
          <a
            href={unlocked ? system.repoUrl : "#"}
            onClick={(e) => {
              if (!unlocked) {
                e.preventDefault();
              }
            }}
            target={unlocked ? "_blank" : undefined}
            rel={unlocked ? "noopener noreferrer" : undefined}
            className={`group relative flex flex-col items-center overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
              unlocked
                ? "border border-emerald-500/30 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:-translate-y-1 cursor-pointer"
                : "border border-slate-700/50 bg-slate-800/50 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="mb-2 text-3xl">⭐</div>
            <div className="text-lg font-bold">
              {unlocked ? "GitHub Repo" : "Locked..."}
            </div>
            {!unlocked && (
              <div className="mt-1 text-xs text-slate-400">
                Wait for timer
              </div>
            )}
          </a>

          {/* Tutorial Video */}
          <a
            href={system.ytVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700"
          >
            <div className="mb-2 text-3xl">📺</div>
            <div className="text-lg font-bold">Tutorial Video</div>
          </a>

          {/* Other Systems */}
          <button
            onClick={() => setShowOtherSystems(!showOtherSystems)}
            className="group flex flex-col items-center rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-pink-600"
          >
            <div className="mb-2 text-3xl">⚡</div>
            <div className="text-lg font-bold">Other Systems</div>
          </button>
        </div>
      </section>

      {/* View All Systems Link */}
      <section className="mb-8 text-center">
        <a
          href={unlocked ? siteConfig.allSystemsUrl : "#"}
          onClick={(e) => {
            if (!unlocked) {
              e.preventDefault();
            }
          }}
          target={unlocked ? "_blank" : undefined}
          rel={unlocked ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-lg font-semibold transition-all ${
            unlocked
              ? "border-purple-400 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 cursor-pointer"
              : "border-slate-700 bg-slate-800/30 text-slate-500 cursor-not-allowed"
          }`}
        >
          🔥 View All {systems.length}+ Systems →
        </a>
      </section>

      {/* Other Systems (Expandable) */}
      {showOtherSystems && (
        <section className="mb-8">
          <div className="rounded-3xl border border-purple-500/20 bg-slate-900/80 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-center text-2xl font-bold text-white">
              🔥 All My Systems
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {systems.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/systems/${s.slug}`}
                  className={`group flex flex-col items-center rounded-xl border-2 p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                    s.slug === system.slug
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-indigo-500/20 bg-indigo-500/10 hover:border-indigo-400 hover:bg-indigo-500/20"
                  }`}
                >
                  <div className="mb-2 text-4xl">{s.icon}</div>
                  <div className="mb-1 text-lg font-bold text-white">
                    {s.displayName}
                  </div>
                  <div className="mb-2 text-sm text-slate-400">
                    {s.waitTimeSeconds}s unlock
                  </div>
                  {s.slug === system.slug ? (
                    <span className="text-xs text-purple-400">Current</span>
                  ) : (
                    <span className="text-xs text-purple-400">
                      → Click for page
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Slot */}
      <section className="mb-8">
        <AdSlot />
      </section>
    </div>
  );
}
