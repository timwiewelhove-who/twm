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
import Olympia from './pages/Olympia'
import Admin from './pages/Admin'
import Rechtliches from './pages/Rechtliches'
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
          <Route path="/events/2026" element={<WM2026 />} />
        <Route path="/wissenswertes/olympia" element={<Olympia />} />
          <Route path="/events/:jahr" element={<EventDetail />} />
          <Route path="/statistiken" element={<Navigate to="/statistiken/weltrangliste" replace />} />
          <Route path="/statistiken/:sub" element={<Statistiken />} />
          <Route path="/wissenswertes" element={<Navigate to="/wissenswertes/historie" replace />} />
          <Route path="/wissenswertes/:sub" element={<Wissenswertes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/spielerprofile" element={<Spielerprofile />} />
          <Route path="/spielerprofile/:name" element={<Spielerprofile />} />
          <Route path="/rechtliches" element={<Rechtliches />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
