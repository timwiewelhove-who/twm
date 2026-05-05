import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Zentraler Hook – lädt alle WM-Daten aus Supabase
// Gibt dasselbe Format zurück wie wm.json, damit alle Seiten
// mit minimalem Aufwand umgestellt werden können

let cache = null // In-Memory-Cache damit nicht jede Seite neu lädt

export function useWMData() {
  const [data, setData] = useState(cache)
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) { setData(cache); setLoading(false); return }
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [
        { data: events },
        { data: abschluss },
        { data: ewig },
        { data: rangliste },
      ] = await Promise.all([
        supabase.from('wm_events').select('*').order('jahr', { ascending: true }),
        supabase.from('abschlusstabellen').select('*').order('jahr').order('pl'),
        supabase.from('ewige_tabelle').select('*').order('pl'),
        supabase.from('weltrangliste').select('*').order('pl'),
      ])

      // Abschlusstabellen nach Jahr gruppieren
      const abschlussByJahr = {}
      abschluss?.forEach(r => {
        const j = String(r.jahr)
        if (!abschlussByJahr[j]) abschlussByJahr[j] = []
        abschlussByJahr[j].push({ pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u, n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt })
      })

      // Fotos aus wm_events extrahieren
      const fotos = {}
      events?.forEach(e => {
        if (e.foto_gruppe) fotos[String(e.jahr)] = { gruppe: e.foto_gruppe }
      })

      // Weltrangliste: punkte ist JSONB {wm2006: x, wm2008: y, ...}
      const weltrangliste = rangliste?.map(r => ({
        pl: r.pl,
        name: r.name,
        ...r.punkte,
        total: r.total,
      })) || []

      // weltmeister im gleichen Format wie wm.json
      const weltmeister = events?.map(e => ({
        jahr: e.jahr,
        sieger: e.sieger,
        titel: e.titel,
        ort: e.ort,
        datum: e.datum,
        teilnehmer: e.teilnehmer,
        torschuetzenkoenig: e.torschuetzenkoenig,
        tore: e.tore,
        punkte: e.punkte,
        spiele: e.spiele,
      })) || []

      const ewige_tabelle = ewig?.map(r => ({
        pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u,
        n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt,
      })) || []

      const result = {
        weltmeister,
        ewige_tabelle,
        weltrangliste,
        abschlusstabellen: abschlussByJahr,
        fotos,
      }

      cache = result
      setData(result)
    } catch (err) {
      setError(err)
      console.error('Fehler beim Laden der WM-Daten:', err)
    }
    setLoading(false)
  }

  return { data, loading, error }
}

// Singleton-Version für Seiten die keinen Hook verwenden können
export async function getWMData() {
  if (cache) return cache
  const hook = { data: null, loading: true, error: null }
  // Direkter Aufruf ohne Hook
  const [
    { data: events },
    { data: abschluss },
    { data: ewig },
    { data: rangliste },
  ] = await Promise.all([
    supabase.from('wm_events').select('*').order('jahr', { ascending: true }),
    supabase.from('abschlusstabellen').select('*').order('jahr').order('pl'),
    supabase.from('ewige_tabelle').select('*').order('pl'),
    supabase.from('weltrangliste').select('*').order('pl'),
  ])
  const abschlussByJahr = {}
  abschluss?.forEach(r => {
    const j = String(r.jahr)
    if (!abschlussByJahr[j]) abschlussByJahr[j] = []
    abschlussByJahr[j].push({ pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u, n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt })
  })
  const fotos = {}
  events?.forEach(e => { if (e.foto_gruppe) fotos[String(e.jahr)] = { gruppe: e.foto_gruppe } })
  const weltrangliste = rangliste?.map(r => ({ pl: r.pl, name: r.name, ...r.punkte, total: r.total })) || []
  const weltmeister = events?.map(e => ({ jahr: e.jahr, sieger: e.sieger, titel: e.titel, ort: e.ort, datum: e.datum, teilnehmer: e.teilnehmer, torschuetzenkoenig: e.torschuetzenkoenig, tore: e.tore, punkte: e.punkte, spiele: e.spiele })) || []
  const ewige_tabelle = ewig?.map(r => ({ pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u, n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt })) || []
  cache = { weltmeister, ewige_tabelle, weltrangliste, abschlusstabellen: abschlussByJahr, fotos }
  return cache
}
