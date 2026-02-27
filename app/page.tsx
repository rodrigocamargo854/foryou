'use client'

import { useEffect, useMemo, useState } from 'react'

type Particle = {
  id: string
  size: number
  duration: number
  dx: number
  dy: number
  color: string
  blur: number
  opacity: number
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
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
  const [particles, setParticles] = useState<Particle[]>([])
  const [power, setPower] = useState(1)

  // segurança: não deixa acumular infinito
  const MAX_PARTICLES = 260
  const MAX_POWER = 10

  useEffect(() => {
    const t = setTimeout(() => setShowFruits(true), 550)
    return () => clearTimeout(t)
  }, [])

  function celebrate() {
    const palette = ['#ffffff', '#60a5fa', '#22d3ee', '#34d399', '#fde047', '#a78bfa']

    const nextPower = Math.min(power + 1, MAX_POWER)
    setPower(nextPower)

    // cresce a cada clique, mas com teto
    const count = 18 + nextPower * 10 // 28, 38, 48... até o teto

    const created: Particle[] = Array.from({ length: count }).map(() => {
      // distribuição radial
      const angle = Math.random() * Math.PI * 2
      const radius = 140 + Math.random() * 220 // distância final
      const dx = Math.cos(angle) * radius
      const dy = Math.sin(angle) * radius

      return {
        id: uid(),
        size: 6 + Math.random() * 10,
        duration: 650 + Math.random() * 650, // ms
        dx,
        dy,
        color: palette[Math.floor(Math.random() * palette.length)],
        blur: Math.random() < 0.25 ? 6 : 0,
        opacity: 0.7 + Math.random() * 0.3
      }
    })

    setParticles((prev) => {
      const merged = [...prev, ...created]
      if (merged.length <= MAX_PARTICLES) return merged
      return merged.slice(merged.length - MAX_PARTICLES)
    })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background animado (alegre e moderno) */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_15%,white,transparent_35%),radial-gradient(circle_at_85%_18%,white,transparent_40%),radial-gradient(circle_at_35%_90%,white,transparent_45%)]" />

      {/* grid bem suave */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Centro com “respiração” de luz */}
      <div className="pointer-events-none absolute inset-0">
        <div className="center-glow" />
      </div>

      {/* Partículas expandindo do centro */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {particles.map((p) => (
          <div
            key={p.id}
            onAnimationEnd={() => setParticles((prev) => prev.filter((x) => x.id !== p.id))}
            className="particle"
            style={
              {
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity,
                filter: p.blur ? `blur(${p.blur}px)` : 'none',
                animationDuration: `${p.duration}ms`,
                // @ts-ignore
                '--dx': `${p.dx}px`,
                // @ts-ignore
                '--dy': `${p.dy}px`
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
        <section className="w-full rounded-3xl border border-white/20 bg-white/10 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-semibold tracking-wide text-white/80">
              Para você
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight">
              Você é importante.
            </h1>

            <p className="mt-3 text-[15px] leading-relaxed text-white/75">
              O Espírito faz crescer o melhor em você.
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {showFruits && (
            <div className="mt-5">
              <p className="text-sm font-bold text-white/90">Frutos do Espírito</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {fruits.map((fruit) => (
                  <span
                    key={fruit}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/80"
                  >
                    {fruit}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7">
            <button
              onClick={celebrate}
              className="w-full rounded-2xl bg-white px-4 py-4 text-[14px] font-extrabold tracking-tight text-zinc-950 shadow-lg active:scale-[0.98]"
            >
              Celebrar
            </button>

            <p className="mt-4 text-center text-xs text-white/60">
              Você tem valor. Sempre.
            </p>
          </div>
        </section>
      </div>

      {/* CSS global */}
      <style jsx global>{`
        .animated-bg {
          background: linear-gradient(-45deg, #2563eb, #22d3ee, #34d399, #fde047, #a78bfa);
          background-size: 450% 450%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .center-glow {
          position: absolute;
          left: 50%;
          top: 42%;
          width: 560px;
          height: 560px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.00) 60%);
          filter: blur(10px);
          animation: breathe 2.4s ease-in-out infinite;
          opacity: 0.9;
        }

        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.02); opacity: 1; }
        }

        .particle {
          position: absolute;
          left: 50%;
          top: 42%;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          animation-name: burst;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
          animation-fill-mode: forwards;
          box-shadow: 0 0 18px rgba(255,255,255,0.25);
        }

        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate3d(var(--dx), var(--dy), 0) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}