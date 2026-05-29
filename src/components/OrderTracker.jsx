import { useOrderTracking } from '../hooks/useOrderTracking.js'

const dotColors = {
  new: 'bg-amber-400',
  preparing: 'bg-orange-400',
  ready: 'bg-emerald-400',
  delivered: 'bg-emerald-400',
}

export default function OrderTracker() {
  const { orderId, order, error, hidden, statusLabel, clearTracking } = useOrderTracking()

  if (hidden || !orderId || (!order && !error)) return null

  return (
    <button
      type="button"
      onClick={clearTracking}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-neutral-900/90 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 animate-fade-in"
      title="Tocá para ocultar"
    >
      <span className={`h-2 w-2 rounded-full ${order ? dotColors[order.status] : 'bg-neutral-500'} animate-pulse`} />
      {error ? 'Error' : statusLabel}
    </button>
  )
}
