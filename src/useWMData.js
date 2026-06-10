import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { gameId } from './logic'

let cache = null

const EXTRA_FOTOS = {
  '2016': [
    '/spieler/Henning_Diers_Weltmeister_2016_1.webp',
    '/spieler/Henning_Diers_Weltmeister_2016_2.webp',
    '/spieler/Henning_Diers_Weltmeister_2016_3.webp',
  ],
  '2018': [
    '/spieler/Holger_Mueller_Weltmeiseter_1.webp',
    '/spieler/Holger_Mueller_Weltmeiseter_2.webp',
    '/spieler/Holger_Mueller_Weltmeiseter_3.webp',
    '/spieler/Peter_Mueller_Meyer.webp',
  ],
  '2022': ['/spieler/Mueller_Praekel_Wachtendorf.webp', '/spieler/Buse_Wachtendorf_Meyer.webp'],
  '2024': [
    '/spieler/Patrick_Christof_Weltmeister_2024_1.webp',
    '/spieler/Patrick_Christof_Weltmeister_2024_2.webp',
    '/spieler/Christof_Buse.webp',
  ],
  '2026': [
    '/TWM_2026_01.jpeg', '/TWM_2026_02.jpeg', '/TWM_2026_03.jpeg',
    '/TWM_2026_04.jpeg', '/TWM_2026_05.jpeg', '/TWM_2026_06.jpeg',
    '/TWM_2026_07.jpeg', '/TWM_2026_08.jpeg', '/TWM_2026_09.jpeg',
    '/TWM_2026_10.jpeg', '/TWM_2026_11.jpeg', '/TWM_2026_12.jpeg',
    '/TWM_2026_13.jpeg', '/TWM_2026_14.jpeg', '/TWM_2026_15.jpeg',
  ],
}

async function loadLiveTournament() {
  const { data: tData } = await supabase.from('tournament').select('*').order('created_at', { ascending: false }).limit(1)
  if (!tData?.length || !tData[0].started) { return null }
  const t = tData[0]
  const { data: rData } = await supabase.from('results').select('*')
  const results = {}
  rData?.forEach(r => { results[r.game_id] = { home: r.home_score, away: r.away_score } })
  return { players: t.players, schedule: t.schedule, results }
}

function calcLiveAbschlusstabelle(players, schedule, results) {
  const rows = players.map((name) => ({ pl: 0, name, sp: 0, s: 0, u: 0, n: 0, t: 0, gg: 0, diff: 0, pkt: 0 }))
  schedule.forEach(st => st.forEach(m => {
    const r = results[gameId(m.home, m.away)]
    if (!r) return
    rows[m.home].sp++; rows[m.home].t += r.home; rows[m.home].gg += r.away
    rows[m.away].sp++; rows[m.away].t += r.away; rows[m.away].gg += r.home
    if (r.home > r.away) { rows[m.home].s++; rows[m.home].pkt += 3; rows[m.away].n++ }
    else if (r.home < r.away) { rows[m.away].s++; rows[m.away].pkt += 3; rows[m.home].n++ }
    else { rows[m.home].u++; rows[m.home].pkt++; rows[m.away].u++; rows[m.away].pkt++ }
  }))
  rows.forEach(r => { r.diff = r.t - r.gg })
  rows.sort((a, b) => b.pkt !== a.pkt ? b.pkt - a.pkt : b.diff !== a.diff ? b.diff - a.diff : b.t - a.t)
  rows.forEach((r, i) => { r.pl = i + 1 })
  return rows
}

function mergeIntoEwigeTabelle(basis, liveTabelle) {
  if (!liveTabelle?.length) return basis
  const merged = basis.map(r => ({ ...r }))
  liveTabelle.forEach(live => {
    const ex = merged.find(r => r.name === live.name)
    if (ex) {
      ex.sp += live.sp; ex.s += live.s; ex.u += live.u; ex.n += live.n
      ex.t += live.t; ex.gg += live.gg; ex.diff = ex.t - ex.gg; ex.pkt += live.pkt
    } else {
      merged.push({ pl: 0, name: live.name, sp: live.sp, s: live.s, u: live.u, n: live.n, t: live.t, gg: live.gg, diff: live.diff, pkt: live.pkt })
    }
  })
  merged.sort((a, b) => b.pkt !== a.pkt ? b.pkt - a.pkt : b.diff !== a.diff ? b.diff - a.diff : b.t - a.t)
  merged.forEach((r, i) => { r.pl = i + 1 })
  return merged
}

async function loadAll() {
  const [
    { data: events }, { data: abschluss }, { data: ewig }, { data: rangliste }, { data: archiveRaw }
  ] = await Promise.all([
    supabase.from('wm_events').select('*').order('jahr', { ascending: true }),
    supabase.from('abschlusstabellen').select('*').order('jahr').order('pl'),
    supabase.from('ewige_tabelle').select('*').order('pl'),
    supabase.from('weltrangliste').select('*').order('pl'),
    (async () => {
      const all = []
      let offset = 0
      while (true) {
        const { data: batch } = await supabase.from('matches_archive').select('*').order('jahr').order('spieltag').range(offset, offset + 999)
        if (!batch?.length) break
        all.push(...batch)
        if (batch.length < 1000) break
        offset += 1000
      }
      return { data: all }
    })(),
  ])

  const abschlussByJahr = {}
  abschluss?.forEach(r => {
    const j = String(r.jahr)
    if (!abschlussByJahr[j]) abschlussByJahr[j] = []
    abschlussByJahr[j].push({ pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u, n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt })
  })

  const fotos = {}
  events?.forEach(e => {
    const j = String(e.jahr)
    fotos[j] = { gruppe: j === '2026' ? '/Trommelschiessen_WM_2026.jpg' : (e.foto_gruppe || null), extra: EXTRA_FOTOS[j] || [] }
  })

  const weltrangliste_basis = rangliste?.map(r => ({ pl: r.pl, name: r.name, ...r.punkte, total: r.total })) || []
  const weltmeister = events?.map(e => ({ jahr: e.jahr, sieger: e.sieger, titel: e.titel, ort: e.ort, datum: e.datum, teilnehmer: e.teilnehmer, torschuetzenkoenig: e.torschuetzenkoenig, tore: e.tore, punkte: e.punkte, spiele: e.spiele })) || []
  const ewige_basis = ewig?.map(r => ({ pl: r.pl, name: r.name, sp: r.sp, s: r.s, u: r.u, n: r.n, t: r.t, gg: r.gg, diff: r.diff, pkt: r.pkt })) || []

  // matches_archive als normalisiertes Array
  const archiveMatches = archiveRaw?.map(r => ({
    jahr: r.jahr, spieltag: r.spieltag,
    home: r.home, away: r.away,
    home_tore: Number(r.home_tore), away_tore: Number(r.away_tore),
    gesamt: Number(r.home_tore) + Number(r.away_tore),
    differenz: Math.abs(Number(r.home_tore) - Number(r.away_tore)),
  })) || []

  const live = await loadLiveTournament()
  let ewige_tabelle = ewige_basis
  let liveTabelle = null
  let liveWeltrangliste = weltrangliste_basis

  if (live) {
    liveTabelle = calcLiveAbschlusstabelle(live.players, live.schedule, live.results)
    abschlussByJahr['2026'] = liveTabelle
    ewige_tabelle = mergeIntoEwigeTabelle(ewige_basis, liveTabelle)

    const torschuetzen = live.players.map((name, i) => {
      let tore = 0
      live.schedule.forEach(st => st.forEach(m => {
        const r = live.results[gameId(m.home, m.away)]
        if (!r) return
        if (m.home === i) tore += r.home
        if (m.away === i) tore += r.away
      }))
      return { name, tore }
    }).sort((a, b) => b.tore - a.tore)

    const gespielt = Object.keys(live.results).length
    const punkteSchema = { 1: 100, 2: 80, 3: 70, 4: 60, 5: 50, 6: 40, 7: 35, 8: 30, 9: 25, 10: 20 }
    if (gespielt > 0) {
      liveWeltrangliste = weltrangliste_basis.map(r => ({ ...r }))
      liveTabelle.forEach((row, idx) => {
        const punkte = punkteSchema[idx + 1] ?? Math.max(1, 15 - idx)
        const existing = liveWeltrangliste.find(r => r.name === row.name)
        if (existing) {
          existing.wm2026 = punkte
          existing.total = Object.entries(existing)
            .filter(([k]) => k.startsWith('wm'))
            .reduce((s, [, v]) => s + v, 0)
        } else {
          liveWeltrangliste.push({ pl: 0, name: row.name, wm2026: punkte, total: punkte })
        }
      })
      liveWeltrangliste.sort((a, b) => b.total - a.total)
      liveWeltrangliste.forEach((r, i) => { r.pl = i + 1 })
    }
    if (gespielt > 0 && !weltmeister.find(e => e.jahr === 2026)) {
      weltmeister.push({
        jahr: 2026,
        sieger: liveTabelle[0]?.name || '–',
        titel: 1, ort: 'läuft', datum: '06.06.2026',
        teilnehmer: live.players.length,
        torschuetzenkoenig: torschuetzen[0]?.name || '–',
        tore: torschuetzen[0]?.tore || 0,
        punkte: liveTabelle[0]?.pkt || 0,
        spiele: gespielt, live: true,
      })
    }
  }

  const gespielt = live ? Object.keys(live.results).length : 0

  // Live-Matches aus wm.live hinzufügen
  let liveMatches = []
  if (live && liveTabelle) {
    live.schedule.forEach((st, stIdx) => {
      st.forEach(m => {
        const r = live.results[gameId(m.home, m.away)]
        if (!r) return
        const homeName = live.players[m.home]
        const awayName = live.players[m.away]
        liveMatches.push({
          jahr: 2026, spieltag: stIdx + 1,
          home: homeName, away: awayName,
          home_tore: r.home, away_tore: r.away,
          gesamt: r.home + r.away,
          differenz: Math.abs(r.home - r.away),
        })
      })
    })
  }

  const matches = [...archiveMatches, ...liveMatches]

  return {
    weltmeister, ewige_tabelle,
    weltrangliste: (live && gespielt > 0) ? liveWeltrangliste : weltrangliste_basis,
    abschlusstabellen: abschlussByJahr, fotos, matches,
    live: live ? { players: live.players, schedule: live.schedule, results: live.results, tabelle: liveTabelle } : null,
  }
}

export function useWMData() {
  const [data, setData] = useState(cache)
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) { setData(cache); setLoading(false); return }
    loadAll().then(result => { cache = result; setData(result); setLoading(false) })
      .catch(err => { setError(err); setLoading(false); console.error('Fehler:', err) })
  }, [])

  useEffect(() => {
    const existing = supabase.getChannels().find(c => c.topic === 'realtime:wm-data-live')
    if (existing) supabase.removeChannel(existing)
    const sub = supabase.channel('wm-data-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, (payload) => {
        const delay = payload.eventType === 'DELETE' ? 800 : 0
        setTimeout(() => {
          cache = null
          loadAll().then(result => { cache = result; setData(result) })
        }, delay)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament' }, () => {
        cache = null
        loadAll().then(result => { cache = result; setData(result) })
      })
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  return { data, loading, error }
}
