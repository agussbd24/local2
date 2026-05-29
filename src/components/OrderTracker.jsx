import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Clock, X } from 'lucide-react'
import { useOrderTracking } from '../hooks/useOrderTracking.js'

const colorMap = {
  amber: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-400/30',
    text: 'text-amber-200',
    dot: 'bg-amber-400',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]',
  },
  orange: {
    bg: 'bg-orange-500/15',
    border: 'border-orange-400/30',
    text: 'text-orange-200',
    dot: 'bg-orange-400',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
  },
  emerald: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-400/30',
    text: 'text-emerald-200',
    dot: 'bg-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.2)]',
  },
}

const steps = [
  { key: 'new', label: 'Recibido', icon: '📋' },
  { key: 'preparing', label: 'Preparando', icon: '👨‍🍳' },
  { key: 'ready', label: 'Listo', icon: '✅' },
  { key: 'delivered', label: 'Entregado', icon: '🎉' },
]

function getStepIndex(status) {
  return steps.findIndex((s) => s.key === status)
}

export default function OrderTracker() {
  const { orderId, order, loading, error, statusLabel, statusColor, hidden, clearTracking } =
    useOrderTracking()
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    if (order?.status === 'delivered') {
      setMinimized(false)
    }
  }, [order?.status])

  if (hidden || !orderId || (!loading && !order && !error)) {
    return null
  }

  const colors = statusColor ? colorMap[statusColor] : colorMap.amber
  const currentStep = order ? getStepIndex(order.status) : 0

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] animate-slide-up">
      <div
        className={`rounded-2xl border ${colors.border} ${colors.bg} ${colors.glow} backdrop-blur-2xl shadow-2xl`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className={`block h-3 w-3 rounded-full ${colors.dot} animate-pulse`} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Seguimiento del pedido
              </p>
              {order && (
                <p className={`text-sm font-bold ${colors.text}`}>{statusLabel}</p>
              )}
              {loading && !order && (
                <p className="text-sm text-neutral-400">Buscando pedido...</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMinimized((m) => !m)}
              className="grid h-8 w-8 place-items-center rounded-xl text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {minimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              type="button"
              onClick={clearTracking}
              className="grid h-8 w-8 place-items-center rounded-xl text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!minimized && order && (
          <div className="border-t border-white/[0.06] px-5 py-4">
            {error && (
              <div className="mb-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              {steps.map((step, index) => {
                const isActive = index === currentStep
                const isDone = index < currentStep

                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-300 ${
                      isActive
                        ? `${colors.bg} ${colors.border} border`
                        : isDone
                          ? 'opacity-60'
                          : 'opacity-30'
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? colors.text : 'text-neutral-300'
                      }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto">
                        <Clock size={14} className={`${colors.text} animate-pulse`} />
                      </span>
                    )}
                    {isDone && (
                      <span className="ml-auto text-xs font-bold text-emerald-400">✓</span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-xs text-neutral-500">
              <span>
                Mesa {order.tableNumber}
                {order.customerName && ` · ${order.customerName}`}
              </span>
              <span>{orderId.slice(0, 8)}...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
