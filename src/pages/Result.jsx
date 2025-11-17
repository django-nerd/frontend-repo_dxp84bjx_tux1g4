import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Result(){
  const navigate = useNavigate()
  const url = localStorage.getItem('sa_last_image')
  const tool = localStorage.getItem('sa_last_tool')
  const email = localStorage.getItem('sa_email')

  const save = async () => {
    if(!url) return
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/gallery`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: email, tool, image_url: url, meta: {} })
    })
    navigate('/gallery')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow">
          <img src={url} alt="result" className="w-full rounded-2xl" />
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={url} download className="px-4 py-2 rounded-full bg-slate-900 text-white">Download</a>
            <button onClick={save} className="px-4 py-2 rounded-full bg-white border border-slate-300">Save to Gallery</button>
            <button onClick={()=>navigate(`/tool/${tool}`)} className="px-4 py-2 rounded-full bg-white border border-slate-300">Regenerate</button>
            <button onClick={()=>navigate('/dashboard')} className="px-4 py-2 rounded-full bg-white border border-slate-300">Try Another Tool</button>
          </div>
        </div>
      </div>
    </div>
  )
}
