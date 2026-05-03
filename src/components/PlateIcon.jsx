// Plate icon – Trommelschießen Meisterschale
export function PlateIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      {/* Outer rim */}
      <ellipse cx="12" cy="13" rx="10" ry="3.5" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Bowl */}
      <path d="M2 13 C2 9 6 6 12 6 C18 6 22 9 22 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Center medallion */}
      <circle cx="12" cy="10" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Top knob */}
      <circle cx="12" cy="6" r="1" fill={color}/>
    </svg>
  )
}
