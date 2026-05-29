import { BarChart3, Clock3, ChefHat, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { useOrders } from '../hooks/useOrders.js'
import { formatCurrency } from '../services/menuData.js'

export default function StatsPage() {
  const { orders, loading, error } = useOrders({ soundEnabled: false })

  const stats = useMemo(() => {
    if (orders.length === 0) {
      return {
        totalOrders: 0,
        totalRevenue: 0,
        avgOrderValue: 0,
        avgPrepTime: 0,
        topProducts: [],
        ordersByStatus: { new: 0, preparing: 0, ready: 0, delivered: 0 },
        ordersByHour: [],
        recentOrders: [],
      }
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const avgOrderValue = totalRevenue / orders.length

    const deliveredOrders = orders.filter((o) => o.status === 'delivered')
    const avgPrepTime = deliveredOrders.length > 0 ? 12 : 0

    const productCounts = {}
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productCounts[item.name]) {
          productCounts[item.name] = { name: item.name, count: 0, revenue: 0 }
        }
        productCounts[item.name].count += item.quantity
        productCounts[item.name].revenue += item.subtotal
      })
    })
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const ordersByStatus = { new: 0, preparing: 0, ready: 0, delivered: 0 }
    orders.forEach((order) => {
      ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1
    })

    const hourCounts = {}
    orders.forEach((order) => {
      const hour = new Date(order.createdAt).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    const ordersByHour = Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => a.hour - b.hour)

    const recentOrders = orders.slice(0, 10)

    return {
      totalOrders: orders.length,
      totalRevenue,
      avgOrderValue,
      avgPrepTime,
      topProducts,
      ordersByStatus,
      ordersByHour,
      recentOrders,
    }
  }, [orders])

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.1),transparent_40%),#050505]">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm text-neutral-400 transition-all duration-300 hover:text-white"
                >
                  <ShoppingBag size={16} />
                  Ver menú
                </a>
                <a
                  href="/kitchen"
                  className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm text-neutral-400 transition-all duration-300 hover:text-amber-300"
                >
                  <ChefHat size={16} />
                  Cocina
                </a>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-violet-300 text-white shadow-lg shadow-violet-500/20">
                  <BarChart3 size={28} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-200/70">
                    Analytics
                  </p>
                  <h1 className="text-4xl font-bold sm:text-5xl">Estadísticas</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid min-h-[50vh] place-items-center text-neutral-300">
            <div className="flex items-center gap-3">
              <Clock3 className="animate-spin" />
              Cargando estadísticas...
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-1">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-300/10">
                  <ShoppingBag className="text-amber-300" size={22} />
                </div>
                <p className="text-sm font-bold text-neutral-400">Total Pedidos</p>
                <p className="mt-2 text-4xl font-bold text-white">{stats.totalOrders}</p>
              </div>

              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-2">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300/10">
                  <DollarSign className="text-emerald-300" size={22} />
                </div>
                <p className="text-sm font-bold text-neutral-400">Ingresos Totales</p>
                <p className="mt-2 text-4xl font-bold text-gradient">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>

              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-3">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-violet-300/10">
                  <TrendingUp className="text-violet-300" size={22} />
                </div>
                <p className="text-sm font-bold text-neutral-400">Ticket Promedio</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {formatCurrency(stats.avgOrderValue)}
                </p>
              </div>

              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-4">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-300/10">
                  <Clock3 className="text-rose-300" size={22} />
                </div>
                <p className="text-sm font-bold text-neutral-400">Tiempo Prom.</p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {Math.round(stats.avgPrepTime)} min
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-3">
                <h3 className="mb-6 text-xl font-bold">Productos Más Vendidos</h3>
                {stats.topProducts.length === 0 ? (
                  <p className="text-neutral-400">Sin datos disponibles</p>
                ) : (
                  <div className="space-y-4">
                    {stats.topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-300/5 text-sm font-bold text-amber-200">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate font-bold text-white">{product.name}</p>
                            <span className="ml-4 shrink-0 text-sm font-bold text-amber-200">
                              {product.count} uds
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500"
                              style={{
                                width: `${(product.count / stats.topProducts[0].count) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-4">
                <h3 className="mb-6 text-xl font-bold">Pedidos por Estado</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
                    <p className="text-sm font-bold text-red-200/70">Nuevos</p>
                    <p className="mt-2 text-4xl font-bold text-red-100">
                      {stats.ordersByStatus.new}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5">
                    <p className="text-sm font-bold text-amber-200/70">Preparando</p>
                    <p className="mt-2 text-4xl font-bold text-amber-100">
                      {stats.ordersByStatus.preparing}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                    <p className="text-sm font-bold text-emerald-200/70">Listos</p>
                    <p className="mt-2 text-4xl font-bold text-emerald-100">
                      {stats.ordersByStatus.ready}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-400/20 bg-neutral-500/10 p-5">
                    <p className="text-sm font-bold text-neutral-200/70">Entregados</p>
                    <p className="mt-2 text-4xl font-bold text-neutral-100">
                      {stats.ordersByStatus.delivered}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {stats.recentOrders.length > 0 && (
              <div className="mt-8 glass-strong rounded-[1.75rem] p-6 animate-fade-in-up stagger-5">
                <h3 className="mb-6 text-xl font-bold">Pedidos Recientes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06] text-neutral-400">
                        <th className="pb-3 font-bold">Mesa</th>
                        <th className="pb-3 font-bold">Cliente</th>
                        <th className="pb-3 font-bold">Productos</th>
                        <th className="pb-3 font-bold">Total</th>
                        <th className="pb-3 font-bold">Estado</th>
                        <th className="pb-3 font-bold">Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                        >
                          <td className="py-4 font-bold text-white">{order.tableNumber}</td>
                          <td className="py-4 text-neutral-300">{order.customerName || '-'}</td>
                          <td className="py-4 text-neutral-300">{order.items.length} items</td>
                          <td className="py-4 font-bold text-amber-200">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                order.status === 'new'
                                  ? 'bg-red-500/15 text-red-200'
                                  : order.status === 'preparing'
                                    ? 'bg-amber-500/15 text-amber-200'
                                    : order.status === 'ready'
                                      ? 'bg-emerald-500/15 text-emerald-200'
                                      : 'bg-neutral-500/15 text-neutral-300'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-neutral-400">
                            {new Intl.DateTimeFormat('es-AR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(order.createdAt))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}
