import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import { mapOrder } from '../services/orderService.js'

const TRACKING_KEY = 'restobar-tracking-id'

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

export function useOrderTracking() {
  const [orderId, setOrderId] = useState(() => {
    try {
      return localStorage.getItem(TRACKING_KEY)
    } catch {
      return null
    }
  })
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hidden, setHidden] = useState(false)

  const clearTracking = useCallback(() => {
    try {
      localStorage.removeItem(TRACKING_KEY)
    } catch {}
    setOrderId(null)
    setOrder(null)
    setHidden(false)
  }, [])

  useEffect(() => {
    if (!orderId || !isSupabaseConfigured) {
      return
    }

    let mounted = true

    async function fetchOrder() {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single()

        if (!mounted) return

        if (fetchError) {
          setError('No se encontró el pedido.')
          return
        }

        setOrder(mapOrder(data))

        if (data.status === 'delivered') {
          setTimeout(() => {
            if (mounted) {
              setHidden(true)
              clearTracking()
            }
          }, deliveredHideDelay)
        }
      } catch {
        if (mounted) setError('Error al buscar el pedido.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchOrder()

    return () => {
      mounted = false
    }
  }, [orderId, clearTracking])

  useEffect(() => {
    if (!orderId || !isSupabaseConfigured || hidden) {
      return undefined
    }

    const channel = supabase
      .channel(`tracking-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          const updatedOrder = mapOrder(payload.new)
          setOrder(updatedOrder)

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
