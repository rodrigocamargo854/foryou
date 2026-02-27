'use client'

import { useEffect, useMemo, useState } from 'react'

type Star = {
  id: string
  left: number
  size: number
  duration: number
  drift: number
  spin: number
  color: string
}

export default function Page() {
  const fruits = useMemo(
    () => [
      'Amor',
      'Alegria',
      'Paz',
      'Paciência',
      'Benignidade',
      'Bondade',
      'Fidelidade',
      'Mansidão',
      'Domínio próprio'
    ],
    []
  )

  const [showFruits, setShowFruits] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [power, setPower] = useState(1)

  // limite seguro para não explodir memória
  const MAX_STARS = 220
  const MAX_POWER = 10

  useEffect(() => {
    const t = setTimeout(() => setShowFruits(true), 600)
    return () => clearTimeout(t)
  }, [])

  function rainStars() {
    const colors = ['#2563eb', '#16a34a', '#f59e0b', '#7c3aed', '#06b6d4', '#f97316']

    // calcula o próximo power (cresce a cada clique, com teto)
    const nextPower = Math.min(power + 1, MAX_POWER)
    setPower(nextPower)

    // quantidade cresce a cada clique
    const count = 16 + nextPower * 7 // 23, 30, 37... até o teto

    const newStars: Star[] = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(16).slice(2) + Date.now().toString(16),
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      duration: 2.8 + Math.random() * 2.0,
      drift: (Math.random() - 0.5) * 140,
      spin: (Math.random() - 0.5) * 220,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))

    // adiciona mantendo um limite para não crescer infinito
    setStars((prev) => {
      const merged = [...prev, ...newStars]
      if (merged.length <= MAX_STARS) return merged
      return merged.slice(merged.length - MAX_STARS) // mantém as mais recentes
    })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-900">
      {/* Fundo alegre neutro */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-cyan-300 to-amber-200" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_15%,white,transparent_35%),radial-gradient(circle_at_85%_20%,white,transparent_40%),radial-gradient(circle_at_35%_90%,white,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(0,0,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Estrelas caindo (aumenta a cada clique, com limite de memória) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {stars.map((star) => (
          <div
            key={star.id}
            // remove cada estrela quando a animação termina (não acumula)
            onAnimationEnd={() => {
              setStars((prev) => prev.filter((s) => s.id !== star.id))
            }}
            style={{
              position: 'absolute',
              left: `${star.left}vw`,
              top: '-50px',
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              animation: `fall ${star.duration}s linear forwards`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              transform: `rotate(${star.spin}deg)`,
              // @ts-ignore
              '--drift': `${star.drift}px`
            }}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
        <section className="w-full rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-white/60 bg-white/40 px-3 py-1.5 text-[12px] font-semibold tracking-wide">
              Para você
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight">Você é importante.</h1>

            <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
              O Espírito faz florescer o melhor em você.
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />

          {showFruits && (
            <div className="mt-5">
              <p className="text-sm font-bold text-zinc-800">Frutos do Espírito</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {fruits.map((fruit) => (
                  <span
                    key={fruit}
                    className="rounded-full border border-white/70 bg-white/50 px-3 py-1.5 text-[12px] font-semibold text-zinc-800"
                  >
                    {fruit}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7">
            <button
              onClick={rainStars}
              className="w-full rounded-2xl bg-zinc-900 px-4 py-4 text-[14px] font-extrabold text-white shadow-lg active:scale-[0.98]"
            >
              Celebrar
            </button>

            <p className="mt-4 text-center text-xs text-zinc-600">Você tem valor. Sempre.</p>
          </div>
        </section>
      </div>

      {/* Animação */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--drift, 0px), 115vh, 0) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}