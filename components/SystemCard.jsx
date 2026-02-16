import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function SystemCard({ system, index }) {
  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
    >
      {/* Gradient thumbnail */}
      {system.thumbnail ? (
  <img
    src={system.thumbnail}
    alt={system.displayName}
    className="h-40 w-full rounded-t-2xl object-cover opacity-90 group-hover:opacity-100 transition-opacity"
    // onError={(e) => {
    //   e.target.style.display = 'none'; // Hide broken image
    // }}
  />
) : (
  <div
    className="flex h-40 items-center justify-center"
    style={{
      background: `linear-gradient(135deg, ${system.gradientFrom}, ${system.gradientTo})`,
    }}
  >
    <span className="text-6xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
      {system.icon}
    </span>
  </div>
)}


      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
          {system.displayName}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
          {system.description}
        </p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(system.tags || []).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs hover:bg-purple-500/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
          <span className="text-xs text-slate-500">
            {system.waitTimeSeconds}s unlock
          </span>
          <span className="text-sm font-medium text-purple-400 transition-colors group-hover:text-purple-300">
            View System →
          </span>
        </div>
      </div>
    </Link>
  );
}
