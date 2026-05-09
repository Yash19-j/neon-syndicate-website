export default function Scanlines() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.02) 2px, rgba(0,240,255,0.02) 4px)'      }}
      aria-hidden="true"
    />
  )
}