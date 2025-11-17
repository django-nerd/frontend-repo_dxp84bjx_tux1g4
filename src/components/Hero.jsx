import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.9]">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            StudioAljo – Your AI Creative Studio
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl">
            Transform your photos with powerful AI tools — styling, redesigns, avatars, memes, and background removal.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/signup" className="px-6 py-3 rounded-full bg-slate-900 text-white shadow-[0_8px_30px_rgba(2,6,23,0.15)] hover:shadow-[0_12px_40px_rgba(2,6,23,0.25)] transition">Sign Up</Link>
            <Link to="/login" className="px-6 py-3 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow hover:shadow-md transition">Log In</Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {["AI Styling", "Room Redesign", "Avatar", "Meme Maker", "Background Remover"].map((t, i) => (
            <div key={t} className="rounded-3xl p-4 bg-white/70 backdrop-blur border border-white shadow-[10px_10px_30px_rgba(0,0,0,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)]">
              <div className="h-20 rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-100 to-amber-100" />
              <p className="mt-3 font-semibold text-slate-800 text-sm">{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
    </section>
  )
}
