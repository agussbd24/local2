import { ChefHat, BarChart3, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 glass-strong">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="group flex items-center gap-3" aria-label="Volver al menú">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/20 to-amber-300/5 text-amber-200 shadow-glow transition-all duration-300 group-hover:scale-105 group-hover:from-amber-300/30 group-hover:to-amber-300/10">
            <UtensilsCrossed size={22} />
          </span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.35em] text-amber-200/70">
              Premium QR
            </span>
            <span className="block text-lg font-bold text-white">Menú Restaurante</span>
          </span>
        </a>

        <nav className="flex items-center gap-3">
          <a
            href="/stats"
            className="hidden items-center gap-2 rounded-full border border-white/10 glass px-4 py-2.5 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-violet-300/40 hover:bg-violet-300/10 hover:text-violet-200 sm:flex"
          >
            <BarChart3 size={17} />
            Estadísticas
          </a>
          <a
            href="/kitchen"
            className="hidden items-center gap-2 rounded-full border border-white/10 glass px-4 py-2.5 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200 sm:flex"
          >
            <ChefHat size={17} />
            Cocina
          </a>
          <button
            type="button"
            onClick={onCartOpen}
            className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-neutral-950 shadow-soft transition-all duration-300 hover:scale-105 hover:bg-amber-200"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-1.5 text-xs font-bold text-neutral-950 ring-4 ring-neutral-950 animate-bounce-in">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
