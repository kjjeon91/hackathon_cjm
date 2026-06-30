// 공용 SVG 아이콘 (이모지 폰트 깨짐 방지)
export function WaveMark({ size = 20, stroke = '#06121f', width = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[8, 13, 18].map((y) => (
        <path
          key={y}
          d={`M2 ${y}c2.5-2.2 4.5-2.2 7 0s4.5 2.2 7 0 4.5-2.2 6 0`}
          stroke={stroke}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export function DownloadIcon({ size = 16, stroke = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SearchIcon({ size = 13, stroke = '#7d93b8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="7" stroke={stroke} strokeWidth="2.2" />
      <path d="M16 16l5 5" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
