import { Scissors, Image as ImageIcon, Wand2, Laugh, Home } from 'lucide-react'

export default function Features() {
  const items = [
    { icon: Wand2, title: 'AI Styling Studio', desc: 'Change hairstyles, outfits, or backgrounds instantly.' },
    { icon: Home, title: 'Room Redesign Studio', desc: 'Transform your room into any interior style.' },
    { icon: ImageIcon, title: 'Avatar Creator', desc: 'Turn selfies into avatars: anime, cyberpunk, fantasy, retro.' },
    { icon: Laugh, title: 'Meme & Poster Maker', desc: 'Add captions and turn any photo into a poster or meme.' },
    { icon: Scissors, title: 'Background Remover', desc: 'Remove image backgrounds cleanly. No watermark.' },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_0%,rgba(99,102,241,0.08),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl p-6 bg-white border border-slate-100 shadow-[10px_10px_30px_rgba(2,6,23,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 flex items-center justify-center">
                <Icon className="text-slate-700" size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
