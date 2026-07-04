import React from 'react'

interface SvgProps { className?: string; size?: number }
type P = { d: string | string[] }

function Svg({ d, size = 24, className }: P & SvgProps) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((path, i) => <path key={i} d={path} />)}
    </svg>
  )
}

export const IconCode = (p: SvgProps) =>
  <Svg {...p} d={['M8 6L3 12l5 6', 'M16 6l5 6-5 6']} />

export const IconMonitor = (p: SvgProps) =>
  <Svg {...p} d={['M3 4h18v14H3z', 'M3 9h18', 'M8 18v2', 'M16 18v2']} />

export const IconServer = (p: SvgProps) =>
  <Svg {...p} d={['M4 4h16v5H4z', 'M4 15h16v5H4z', 'M8 6.5h.01', 'M8 17.5h.01']} />

export const IconDatabase = (p: SvgProps) =>
  <Svg {...p} d={['M12 5c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z', 'M4 8v8c0 1.7 3.6 3 8 3s8-1.3 8-3V8']} />

export const IconCloud = (p: SvgProps) =>
  <Svg {...p} d={['M6 17a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0117 17H6z']} />

export const IconGit = (p: SvgProps) =>
  <Svg {...p} d={['M3 12a9 9 0 1018 0 9 9 0 00-18 0z', 'M12 8v4l3 2']} />

export const IconLayers = (p: SvgProps) =>
  <Svg {...p} d={['M12 3l9 4.5-9 4.5-9-4.5z', 'M3 12l9 4.5 9-4.5', 'M3 16.5L12 21l9-4.5']} />

export const IconArrow = (p: SvgProps) =>
  <Svg {...p} d={['M7 17L17 7M17 7H8M17 7v9']} />

export const IconSend = (p: SvgProps) =>
  <Svg {...p} d={['M4 12l16-8-6 16-3-6-7-2z']} />

export const IconX = (p: SvgProps) =>
  <Svg {...p} d={['M6 6l12 12', 'M18 6L6 18']} />

export const IconMenu = (p: SvgProps) =>
  <Svg {...p} d={['M3 6h18', 'M3 12h18', 'M3 18h18']} />

export const IconMail = (p: SvgProps) =>
  <Svg {...p} d={['M3 6h18v12H3z', 'M3 7l9 6 9-6']} />

export const IconPhone = (p: SvgProps) =>
  <Svg {...p} d={['M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 010-2z']} />

export const IconPin = (p: SvgProps) =>
  <Svg {...p} d={['M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11z', 'M12 10a2 2 0 100-4 2 2 0 000 4z']} />

export const IconClock = (p: SvgProps) =>
  <Svg {...p} d={['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M12 7v5l3 2']} />

export const IconSearch = (p: SvgProps) =>
  <Svg {...p} d={['M11 3a8 8 0 100 16A8 8 0 0011 3z', 'M21 21l-4.35-4.35']} />

export const IconDownload = (p: SvgProps) =>
  <Svg {...p} d={['M12 3v12', 'M8 11l4 4 4-4', 'M3 19h18']} />

export const IconGlobe = (p: SvgProps) =>
  <Svg {...p} d={['M12 3a9 9 0 100 18A9 9 0 0012 3z', 'M3 12h18', 'M12 3c-2.5 3-4 5.7-4 9s1.5 6 4 9', 'M12 3c2.5 3 4 5.7 4 9s-1.5 6-4 9']} />

export function getIconByName(name: string) {
  const map: Record<string, (p: SvgProps) => React.JSX.Element> = {
    code: IconCode,
    monitor: IconMonitor,
    server: IconServer,
    database: IconDatabase,
    cloud: IconCloud,
    git: IconGit,
    layers: IconLayers,
  }
  return map[name] ?? IconCode
}
