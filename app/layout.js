import './globals.css'
import Script from 'next/script'
import { siteConfig } from '@/lib/systems'

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);',
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">🎮</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                All Systems
              </a>
              <a
                href={siteConfig.allSystemsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300 border border-purple-500/30 transition-all hover:bg-purple-500/30 hover:text-purple-200"
              >
                🔥 Get All Systems
              </a>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="min-h-[calc(100vh-80px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 py-8 text-center">
          <p className="text-sm text-slate-600">
            Built with ❤️ for Roblox developers
          </p>
        </footer>

        {/* Plausible Analytics */}
        <Script
          defer
          data-domain={siteConfig.plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
