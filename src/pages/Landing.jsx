import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function Landing(){
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
