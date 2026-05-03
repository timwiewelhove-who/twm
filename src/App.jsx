import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Statistiken from './pages/Statistiken'
import Wissenswertes from './pages/Wissenswertes'
import Spielerprofile from './pages/Spielerprofile'
import WM2026 from './pages/WM2026'
import Admin from './pages/Admin'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
