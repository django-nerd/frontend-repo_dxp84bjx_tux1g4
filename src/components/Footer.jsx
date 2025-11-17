export default function Footer(){
  return (
    <footer className="py-10 border-t border-slate-200 bg-white/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
        <p className="font-semibold">Studio<span className="text-slate-400">Aljo</span></p>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
          <a href="#" className="hover:text-slate-900">Support</a>
        </nav>
      </div>
    </footer>
  )
}
