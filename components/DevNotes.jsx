export default function DevNotes({ devNotesUrl, brawlNotes }) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <span>📝</span>
        Developer Notes
      </h3>
      <a
        href={devNotesUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 inline-flex items-center gap-1 font-semibold text-purple-400 transition-colors hover:text-purple-300"
      >
        View full dev notes
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
      {brawlNotes && (
        <p className="mt-3 border-t border-slate-700/50 pt-3 text-sm text-orange-400/80">
          {brawlNotes}
        </p>
      )}
    </div>
  );
}
