// The MGP seal turning inside a sweeping green arc — the site's loading mark.
//
// The two speeds are deliberate: the seal turns slowly (2.6s) while the arc
// sweeps much faster (0.9s). Spinning a detailed seal quickly just blurs it
// and reads as cheap, so the arc carries the energy and the logo stays
// legible. Don't take it below ~24px; smaller than that the seal turns to
// mush and stops reading as the logo at all, which defeats the point.
export default function LoadingSeal({
  size = 44,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`relative inline-flex shrink-0 items-center justify-center align-middle ${className}`}
      style={{ height: size, width: size }}
    >
      <span className="mgp-seal-arc absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-primary/40" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        className="mgp-seal rounded-full"
        style={{ height: size - 12, width: size - 12 }}
      />
    </span>
  )
}
