export default function VignetteOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(5,5,9,0.45) 70%, rgba(5,5,9,0.85) 100%)',
      }}
    />
  )
}
