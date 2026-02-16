"use client";

import { useState, useEffect, useCallback } from "react";

export default function TimerCard({ waitTimeSeconds, displayName, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(waitTimeSeconds);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleComplete]);

  const progress = ((waitTimeSeconds - timeLeft) / waitTimeSeconds) * 100;

  if (isComplete) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5" />
        <div className="relative">
          <div className="mb-3 text-5xl">✅</div>
          <div className="mb-2 text-2xl font-bold text-emerald-400">
            {displayName} Ready
          </div>
          <div className="mb-1 text-slate-300">Verified by creator</div>
          <div className="text-xs text-slate-500">Safe GitHub link</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-8 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            <span className="mr-2">⏳</span>
            Preparing {displayName}...
          </span>
          <span className="text-4xl font-mono font-bold text-purple-400">
            {timeLeft}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-slate-500">
          Link will be available in {timeLeft} second{timeLeft !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
