import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import Turniere from './pages/Events'
import EventDetail from './pages/EventDetail'
import Statistiken from './pages/Statistiken'
import Info from './pages/Wissenswertes'
import Spielerprofile from './pages/Spielerprofile'
import WM2026 from './pages/WM2026'
import Olympia from './pages/Olympia'
import Admin from './pages/Admin'
import Rechtliches from './pages/Rechtliches'
import './index.css'

function LegacyEventRedirect() {
  const { jahr } = useParams()
  return <Navigate to={`/turniere/${jahr}`} replace />
}
function LegacyStatsRedirect() {
  const { sub } = useParams()
  return <Navigate to={`/stats/${sub}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Turniere */}
          <Route path="/turniere" element={<Turniere />} />
          <Route path="/turniere/2026" element={<WM2026 />} />
          <Route path="/turniere/:jahr" element={<EventDetail />} />
          <Route path="/events" element={<Navigate to="/turniere" replace />} />
          <Route path="/events/2026" element={<Navigate to="/turniere/2026" replace />} />
          <Route path="/events/:jahr" element={<LegacyEventRedirect />} />

          {/* Ranglisten */}
          <Route path="/ranglisten" element={<Statistiken />} />
          <Route path="/ranglisten/:sub" element={<Statistiken />} />

          {/* Stats */}
          <Route path="/stats" element={<Statistiken />} />
          <Route path="/stats/:sub" element={<Statistiken />} />

          {/* Legacy statistiken */}
          <Route path="/statistiken/weltrangliste" element={<Navigate to="/ranglisten/weltrangliste" replace />} />
          <Route path="/statistiken/ewige-tabelle" element={<Navigate to="/ranglisten/ewige-tabelle" replace />} />
          <Route path="/statistiken/champs" element={<Navigate to="/ranglisten/weltmeister" replace />} />
          <Route path="/statistiken/:sub" element={<LegacyStatsRedirect />} />

          {/* Info */}
          <Route path="/info" element={<Info />} />
          <Route path="/info/olympia" element={<Olympia />} />
          <Route path="/info/:sub" element={<Info />} />
          <Route path="/wissenswertes" element={<Navigate to="/info/historie" replace />} />
          <Route path="/wissenswertes/olympia" element={<Navigate to="/info/olympia" replace />} />
          <Route path="/wissenswertes/:sub" element={<Info />} />

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
