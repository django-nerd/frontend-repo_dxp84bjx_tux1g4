import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const email = localStorage.getItem('sa_email')

  const logout = () => {
    localStorage.removeItem('sa_token')
    localStorage.removeItem('sa_email')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/40 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 shadow-[inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-6px_-6px_12px_rgba(0,0,0,0.05)]" />
          <span className="font-extrabold text-slate-900 tracking-tight text-lg">
            Studio<span className="text-slate-500">Aljo</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 transition">Dashboard</Link>
          <Link to="/gallery" className="text-slate-600 hover:text-slate-900 transition">Gallery</Link>
          {email ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 shadow-sm border border-slate-200">
                <User size={16} className="text-slate-500" />
                <span className="text-sm text-slate-700">{email}</span>
              </div>
              <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition shadow">
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 rounded-full border border-slate-300 bg-white shadow hover:shadow-md transition">Log In</Link>
              <Link to="/signup" className="px-4 py-2 rounded-full bg-slate-900 text-white shadow hover:shadow-lg transition">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
