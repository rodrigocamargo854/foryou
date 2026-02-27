'use client'

import { useEffect, useMemo, useState } from 'react'

type Particle = {
  id: string
  x: number
  size: number
  duration: number
  color: string
}

export default function Page() {
  const fruits = useMemo(
    () => [
      'Amor',
      'Alegria',
      'Paz',
      'Paciência',
      'Bondade',
      'Fidelidade',
      'Mansidão',
      'Domínio próprio'
    ],
    []
  )

  const [rain, setRain] = useState<Particle[]>([])

  function celebrate() {
    const colors = ['#2563eb', '#22d3ee', '#34d399', '#fde047', '#a78bfa']

    const drops: Particle[] = Array.from({ length: 40 }).map(() => ({
      id: Math.random().toString(16).slice(2),
      x: Math.random() * 100,
      size: 8 + Math.random() * 12,
      duration: 2 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))

    setRain(drops)

    setTimeout(() => {
      setRain([])
    }, 3500)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-900">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-cyan-300 to-amber-200" />

      {/* CHUVA */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {rain.map((drop) => (
          <div
            key={drop.id}
            style={{
              position: 'absolute',
              left: `${drop.x}vw`,
              top: '-20px',
              width: drop.size,
              height: drop.size,
              backgroundColor: drop.color,
              borderRadius: '50%',
              animation: `fall ${drop.duration}s linear forwards`
            }}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl bg-white/50 backdrop-blur-xl p-8 shadow-xl text-center">

          <h1 className="text-4xl font-black">
            Você é importante.
          </h1>

          <p className="mt-4 text-zinc-700 text-sm">
            O Espírito Santo faz crescer o melhor em você.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {fruits.map((fruit) => (
              <span
                key={fruit}
                className="px-3 py-1 text-xs rounded-full bg-white/60 border border-black/10"
              >
                {fruit}
              </span>
            ))}
          </div>

          <button
            onClick={celebrate}
            className="mt-8 w-full py-4 rounded-2xl bg-black text-white font-bold"
          >
            Celebrar
          </button>
        </div>
      </div>

      {/* CSS */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>

    </main>
  )
}