import { useState } from 'react'
import Navbar from '../components/Navbar'

export function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if(!res.ok) throw new Error('Login failed')
      const data = await res.json()
      localStorage.setItem('sa_token', data.access_token)
      localStorage.setItem('sa_email', email)
      window.location.href = '/dashboard'
    } catch (e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-[10px_10px_30px_rgba(2,6,23,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)]">
          <h2 className="text-2xl font-bold text-slate-900">Log in</h2>
          <p className="text-sm text-slate-600 mt-1">Welcome back to StudioAljo</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none" />
            <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" placeholder="Password" className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none" />
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-slate-500 hover:text-slate-900">Forgot password?</a>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button disabled={loading} className="w-full px-4 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if(password !== confirm){ setError('Passwords do not match'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if(!res.ok) throw new Error('Signup failed')
      const data = await res.json()
      localStorage.setItem('sa_token', data.access_token)
      localStorage.setItem('sa_email', email)
      window.location.href = '/dashboard'
    } catch (e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-[10px_10px_30px_rgba(2,6,23,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)]">
          <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
          <p className="text-sm text-slate-600 mt-1">Create your StudioAljo account and get free AI credits.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none" />
            <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" placeholder="Password" className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none" />
            <input value={confirm} onChange={e=>setConfirm(e.target.value)} required type="password" placeholder="Confirm Password" className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button disabled={loading} className="w-full px-4 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
