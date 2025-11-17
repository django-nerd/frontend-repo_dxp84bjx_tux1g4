import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Wand2, Home, UserSquare2, Laugh, Scissors } from 'lucide-react'

const cards = [
  { key: 'styling', title: 'AI Styling Studio', desc: 'Change hairstyles, outfits, or backgrounds instantly.', icon: Wand2 },
  { key: 'room', title: 'Room Redesign Studio', desc: 'Transform your room into any interior style.', icon: Home },
  { key: 'avatar', title: 'Avatar Creator', desc: 'Turn selfies into avatars: anime, cyberpunk, fantasy, retro.', icon: UserSquare2 },
  { key: 'meme', title: 'Meme & Poster Maker', desc: 'Add captions and turn any photo into a poster or meme.', icon: Laugh },
  { key: 'bgremove', title: 'Background Remover', desc: 'Remove image backgrounds cleanly. No watermark.', icon: Scissors },
]

export default function Dashboard(){
  const email = localStorage.getItem('sa_email')
  const [quota, setQuota] = useState({ credits: 0, limit: 50 })

  useEffect(() => {
    const fetchQuota = async () => {
      if(!email) return
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quota?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        setQuota(data)
      } catch {}
    }
    fetchQuota()
  }, [email])

  const pct = Math.max(0, Math.min(100, (quota.credits / quota.limit) * 100))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Welcome to StudioAljo, Your AI Creation Hub</h1>
        <div className="mt-8 flex items-center gap-6 flex-wrap">
          <div className="relative w-36 h-36 rounded-full bg-white shadow-inner border border-slate-200 flex items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 36 36">
              <path className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" />
              <path className="text-violet-500" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d={`M18 2 a 16 16 0 ${pct>50?1:0} 1 0 32 a 16 16 0 ${pct>50?1:0} 1 0 -32`}></path>
            </svg>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{quota.credits}</div>
              <div className="text-xs text-slate-500">Requests Left</div>
            </div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow">Requests Left: {quota.credits} / {quota.limit}</div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ key, title, desc, icon: Icon }, idx) => (
            <a key={key} href={`/tool/${key}`} className={`rounded-3xl p-6 bg-white border border-slate-200 shadow-[10px_10px_30px_rgba(2,6,23,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)] ${idx>2 ? 'lg:col-span-1' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 flex items-center justify-center">
                <Icon className="text-slate-700" size={22} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{desc}</p>
              <button className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white">Start</button>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
