// Subtle SVG noise grain — generated inline so we don't ship an extra asset.
const grainSvg = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
     <filter id='n'>
       <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' seed='4'/>
       <feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.92 0 0 0 0 0.85 0 0 0 0.55 0'/>
     </filter>
     <rect width='100%' height='100%' filter='url(%23n)'/>
   </svg>`
).replace(/%23/g, '%23')

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light opacity-[0.13]"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${grainSvg}")`,
        backgroundSize: '240px 240px',
      }}
    />
  )
}
