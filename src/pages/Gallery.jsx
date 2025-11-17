import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Gallery(){
  const email = localStorage.getItem('sa_email')
  const [items, setItems] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/gallery?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      setItems(data.items || [])
    }
    if(email) run()
  }, [email])

  const remove = async (id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/gallery?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    setItems(items.filter(i=>i._id!==id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Your Gallery</h1>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item._id} className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow relative">
              <img src={item.image_url} alt="img" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-end">
                <div className="w-full p-2 opacity-0 group-hover:opacity-100 transition flex items-center justify-between text-white text-xs">
                  <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">{item.tool}</span>
                  <div className="flex gap-2">
                    <button onClick={()=>setLightbox(item.image_url)} className="px-2 py-1 rounded-full bg-white/20">View</button>
                    <a href={item.image_url} download className="px-2 py-1 rounded-full bg-white/20">Download</a>
                    <button onClick={()=>remove(item._id)} className="px-2 py-1 rounded-full bg-white/20">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6" onClick={()=>setLightbox(null)}>
            <img src={lightbox} alt="full" className="max-h-[90vh] rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  )
}
