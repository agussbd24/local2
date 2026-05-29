import { useEffect, useRef } from 'react'
import { Clock3, Sparkles, Wifi } from 'lucide-react'

export default function Hero() {
  const imageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY
        imageRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1800&q=90"
          alt="Hamburguesa premium sobre mesa oscura"
          className="h-full w-full object-cover scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.4)_0%,rgba(5,5,5,0.7)_50%,rgba(5,5,5,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-end px-4 pb-14 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 glass px-4 py-2 text-sm font-medium text-amber-100 animate-fade-in-up stagger-1">
            <Sparkles size={16} className="text-amber-300" />
            Ordená desde tu mesa
          </div>
          <h1 className="max-w-2xl text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl animate-fade-in-up stagger-2">
            <span className="text-gradient">Menú Premium</span>
            <br />
            <span className="text-white/90">Restaurante QR</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg animate-fade-in-up stagger-3">
            Elegí tus favoritos, sumá observaciones y enviá el pedido directo a cocina.
          </p>
          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3 animate-fade-in-up stagger-4">
            <div className="glass-strong rounded-2xl p-5 transition-all duration-300 hover:border-amber-300/20 hover:bg-amber-300/5">
              <Clock3 className="mb-3 text-amber-300" size={22} />
              <p className="text-sm font-bold text-white">Pedido ágil</p>
              <p className="mt-1 text-xs text-neutral-400">Sin esperar al mozo</p>
            </div>
            <div className="glass-strong rounded-2xl p-5 transition-all duration-300 hover:border-emerald-300/20 hover:bg-emerald-300/5">
              <Wifi className="mb-3 text-emerald-300" size={22} />
              <p className="text-sm font-bold text-white">Realtime</p>
              <p className="mt-1 text-xs text-neutral-400">Cocina recibe al instante</p>
            </div>
            <div className="glass-strong rounded-2xl p-5 transition-all duration-300 hover:border-violet-300/20 hover:bg-violet-300/5">
              <Sparkles className="mb-3 text-violet-300" size={22} />
              <p className="text-sm font-bold text-white">Premium UX</p>
              <p className="mt-1 text-xs text-neutral-400">Mobile-first y fluido</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
