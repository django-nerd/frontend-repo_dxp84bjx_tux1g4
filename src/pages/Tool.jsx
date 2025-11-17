import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const TOOL_CONFIG = {
  styling: {
    title: 'AI Styling Studio',
    tabs: {
      Hairstyle: ['Wavy Hair','Bob Cut','Curly','Buzz Cut'],
      Outfit: ['Streetwear','Formal','Casual','Retro'],
      Background: ['Sunset','Studio','Neon','Nature']
    }
  },
  room: {
    title: 'Room Redesign Studio',
    options: ['Modern','Minimalist','Boho','Japanese Zen','Industrial']
  },
  avatar: {
    title: 'Avatar Creator',
    options: ['Anime','Cyberpunk','Pixar','Fantasy','Filmic','Realistic']
  },
  meme: {
    title: 'Meme & Poster Maker',
    meme: true
  },
  bgremove: {
    title: 'Background Remover',
    bg: true
  }
}

export default function Tool(){
  const { tool } = useParams()
  const navigate = useNavigate()
  const email = localStorage.getItem('sa_email')
  const config = TOOL_CONFIG[tool]

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [selected, setSelected] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quota, setQuota] = useState({ credits: 0, limit: 50 })

  useEffect(() => { if(!config) navigate('/dashboard') }, [config])
  useEffect(() => { if(!email) navigate('/login') }, [email])
  useEffect(() => { if(!file) return; setPreview(URL.createObjectURL(file)) }, [file])

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

  const onDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if(f) setFile(f)
  }

  const submit = async () => {
    if(!file) return
    setLoading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('tool', tool)
      fd.append('email', email)
      fd.append('file', file)
      fd.append('options', JSON.stringify(selected))
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, { method: 'POST', body: fd })
      if(!res.ok) throw new Error('Generation failed')
      const data = await res.json()
      localStorage.setItem('sa_last_image', data.image_url)
      localStorage.setItem('sa_last_tool', tool)
      navigate('/result')
    } catch (e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{config?.title}</h1>
          <p className="text-sm text-slate-500 mt-1">Requests Left: {quota.credits} / {quota.limit}</p>
          <div onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} className="mt-6 aspect-video rounded-3xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-500">
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-contain rounded-3xl" />
            ) : (
              <div className="text-center">
                <p className="font-semibold">Drop image here</p>
                <p className="text-sm">or</p>
                <label className="mt-2 inline-block px-4 py-2 rounded-full bg-slate-900 text-white cursor-pointer">
                  Upload Image
                  <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="hidden" accept="image/*" />
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow">
            <h3 className="text-lg font-semibold text-slate-900">Controls</h3>
            {/* Styling tabs */}
            {tool==='styling' && (
              <div className="mt-4 space-y-4">
                {Object.entries(config.tabs).map(([tab, items]) => (
                  <div key={tab}>
                    <p className="text-sm font-semibold text-slate-700">{tab}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {items.map((opt) => (
                        <button key={opt} onClick={()=>setSelected(s=>({...s, [tab]: opt}))} className={`px-3 py-1.5 rounded-full border ${selected[tab]===opt?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-700 border-slate-300'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Room */}
            {tool==='room' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {config.options.map((opt) => (
                  <button key={opt} onClick={()=>setSelected({ style: opt })} className={`px-3 py-1.5 rounded-full border ${selected.style===opt?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-700 border-slate-300'}`}>{opt}</button>
                ))}
              </div>
            )}
            {/* Avatar */}
            {tool==='avatar' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {config.options.map((opt) => (
                  <button key={opt} onClick={()=>setSelected({ style: opt })} className={`px-3 py-1.5 rounded-full border ${selected.style===opt?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-700 border-slate-300'}`}>{opt}</button>
                ))}
              </div>
            )}
            {/* Meme */}
            {tool==='meme' && (
              <div className="mt-4 space-y-3">
                <input onChange={(e)=>setSelected(s=>({...s, top: e.target.value}))} placeholder="Caption top" className="w-full px-4 py-2 rounded-2xl border border-slate-300" />
                <input onChange={(e)=>setSelected(s=>({...s, bottom: e.target.value}))} placeholder="Caption bottom" className="w-full px-4 py-2 rounded-2xl border border-slate-300" />
                <select onChange={(e)=>setSelected(s=>({...s, font: e.target.value}))} className="w-full px-4 py-2 rounded-2xl border border-slate-300">
                  <option>Impact</option>
                  <option>Montserrat</option>
                  <option>Open Sans</option>
                </select>
              </div>
            )}
            {/* Background remover */}
            {tool==='bgremove' && (
              <div className="mt-4 space-y-3">
                <button onClick={()=>setSelected({ action: 'auto' })} className="px-3 py-1.5 rounded-full border bg-white text-slate-700 border-slate-300">Auto Remove Background</button>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Replace background</p>
                  <input type="color" onChange={(e)=>setSelected(s=>({...s, color: e.target.value}))} />
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            <button disabled={!file || loading} onClick={submit} className="mt-6 w-full px-4 py-3 rounded-full bg-slate-900 text-white disabled:opacity-50">
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
