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

          {/* Turniere */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/2026" element={<WM2026 />} />
          <Route path="/events/:jahr" element={<EventDetail />} />

          {/* Ranglisten — neue URLs, alte als Redirect */}
          <Route path="/ranglisten" element={<Navigate to="/ranglisten/weltrangliste" replace />} />
          <Route path="/ranglisten/:sub" element={<Statistiken />} />
          <Route path="/statistiken/weltrangliste" element={<Navigate to="/ranglisten/weltrangliste" replace />} />
          <Route path="/statistiken/ewige-tabelle" element={<Navigate to="/ranglisten/ewige-tabelle" replace />} />
          <Route path="/statistiken/champs" element={<Navigate to="/ranglisten/weltmeister" replace />} />

          {/* Stats — neue URLs, alte als Redirect */}
          <Route path="/stats" element={<Navigate to="/stats/ballermann" replace />} />
          <Route path="/stats/:sub" element={<Statistiken />} />
          <Route path="/statistiken/:sub" element={<Statistiken />} />

          {/* Info — neue URLs, alte Wissenswertes-Pfade als Redirect */}
          <Route path="/info" element={<Navigate to="/info/historie" replace />} />
          <Route path="/info/olympia" element={<Olympia />} />
          <Route path="/info/:sub" element={<Wissenswertes />} />
          <Route path="/wissenswertes/olympia" element={<Navigate to="/info/olympia" replace />} />
          <Route path="/wissenswertes" element={<Navigate to="/info/historie" replace />} />
          <Route path="/wissenswertes/:sub" element={<Wissenswertes />} />

          {/* Spielerprofile */}
          <Route path="/spielerprofile" element={<Spielerprofile />} />
          <Route path="/spielerprofile/:name" element={<Spielerprofile />} />

          {/* Sonstiges */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/rechtliches" element={<Rechtliches />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
