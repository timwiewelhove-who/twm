import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Statistiken from './pages/Statistiken'
import Wissenswertes from './pages/Wissenswertes'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:jahr" element={<EventDetail />} />
          <Route path="/statistiken" element={<Navigate to="/statistiken/weltrangliste" replace />} />
          <Route path="/statistiken/:sub" element={<Statistiken />} />
          <Route path="/wissenswertes" element={<Navigate to="/wissenswertes/historie" replace />} />
          <Route path="/wissenswertes/:sub" element={<Wissenswertes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
