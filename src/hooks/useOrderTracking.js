import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import { mapOrder } from '../services/orderService.js'

const TRACKING_KEY = 'restobar-tracking-id'
const CACHE_KEY = 'restobar-tracking-cache'

const statusLabels = {
  new: 'Recibido',
  preparing: 'Preparando',
  ready: 'Listo para entregar',
  delivered: 'Entregado',
}

const statusColors = {
  new: 'amber',
  preparing: 'orange',
  ready: 'emerald',
  delivered: 'emerald',
}

const deliveredHideDelay = 5000

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveCache(order) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(order))
  } catch {}
}

function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(TRACKING_KEY)
  } catch {}
}

export function useOrderTracking() {
  const cached = loadCache()
  const [orderId, setOrderId] = useState(() => {
    try {
      return localStorage.getItem(TRACKING_KEY)
    } catch {
      return null
    }
  })
  const [order, setOrder] = useState(cached)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hidden, setHidden] = useState(false)
  const realtimeConnected = useRef(false)

  const clearTracking = useCallback(() => {
    clearCache()
    setOrderId(null)
    setOrder(null)
    setHidden(false)
  }, [])

  useEffect(() => {
    if (!orderId || !isSupabaseConfigured) return

    let mounted = true

    supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
      .then(({ data, error: fetchError }) => {
        if (!mounted) return
        if (fetchError || !data) {
          setError('No se encontró el pedido.')
          return
        }
        const mapped = mapOrder(data)
        setOrder(mapped)
        saveCache(mapped)

        if (data.status === 'delivered') {
          setTimeout(() => {
            if (mounted) {
              setHidden(true)
              clearTracking()
            }
          }, deliveredHideDelay)
        }
      })
      .catch(() => {
        if (mounted) setError('Error al buscar el pedido.')
      })

    return () => { mounted = false }
  }, [orderId, clearTracking])

  useEffect(() => {
    if (!orderId || !isSupabaseConfigured || hidden) return undefined

    const channel = supabase
      .channel(`tracking-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          realtimeConnected.current = true
          const updatedOrder = mapOrder(payload.new)
          setOrder(updatedOrder)
          saveCache(updatedOrder)

          if (updatedOrder.status === 'delivered') {
            setTimeout(() => {
              setHidden(true)
              clearTracking()
            }, deliveredHideDelay)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [orderId, hidden, clearTracking])

  return {
    orderId,
    order,
    loading,
    error,
    hidden,
    statusLabel: order ? statusLabels[order.status] : null,
    statusColor: order ? statusColors[order.status] : null,
    clearTracking,
  }
}
