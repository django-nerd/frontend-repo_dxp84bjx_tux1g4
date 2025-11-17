import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { Login, Signup } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Tool from './pages/Tool'
import Result from './pages/Result'
import Gallery from './pages/Gallery'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tool/:tool" element={<Tool />} />
      <Route path="/result" element={<Result />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  )
}

export default App
