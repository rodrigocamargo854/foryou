'use client'

import { useEffect, useMemo, useState } from 'react'

type Particle = {
  id: string
  size: number
  duration: number
  dx: number
  dy: number
  color: string
  opacity: number
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

function AnimatedBorderCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-3xl p-[1px]">
      <div className="absolute inset-0 rounded-3xl animated-ring" />
      <div className="relative rounded-3xl bg-white/55 backdrop-blur-2xl border border-black/10 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.20)]">
        {children}
      </div>

      <style jsx global>{`
        .animated-ring {
          background: conic-gradient(
            from 0deg,
            rgba(37, 99, 235, 0) 0deg,
            rgba(34, 211, 238, 0.8) 70deg,
            rgba(52, 211, 153, 0.8) 140deg,
            rgba(253, 224, 71, 0.8) 210deg,
            rgba(167, 139, 250, 0.8) 280deg,
            rgba(37, 99, 235, 0.8) 360deg
          );
          filter: blur(10px);
          animation: ringSpin 6s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 10px;
        }

        @keyframes ringSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function Page() {
  const lines = useMemo(() => ['Fomos chamados', 'filhos de Deus.'], [])

  const [particles, setParticles] = useState<Particle[]>([])
  const [power, setPower] = useState(1)
  const [pulseBoost, setPulseBoost] = useState(false)

  const MAX_PARTICLES = 220
  const MAX_POWER = 10

  function celebrate() {
    setPulseBoost(true)
    setTimeout(() => setPulseBoost(false), 300)

    const palette = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']
    const nextPower = Math.min(power + 1, MAX_POWER)
    setPower(nextPower)

    const count = 18 + nextPower * 8

    const created: Particle[] = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = 120 + Math.random() * 200
      return {
        id: uid(),
        size: 6 + Math.random() * 10,
        duration: 600 + Math.random() * 600,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 0.8
      }
    })

    setParticles((prev) => {
      const merged = [...prev, ...created]
      if (merged.length <= MAX_PARTICLES) return merged
      return merged.slice(merged.length - MAX_PARTICLES)
    })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-900">

      {/* Background */}
      <div className="absolute inset-0 animated-bg" />

      {/* Partículas */}
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
        <AnimatedBorderCard>
          <div className="text-center">

            <h1 className="text-4xl font-black leading-tight tracking-tight text-zinc-950">
              {lines[0]}<br />{lines[1]}
            </h1>

            <p className="mt-3 text-[15px] text-zinc-700">
              Olha o amor que Deus nos deu.
            </p>

            {/* Coração */}
            <div className="mt-8 flex justify-center">
              <div className={`heart ${pulseBoost ? 'heart-boost' : ''}`} />
            </div>

            <button
              onClick={celebrate}
              className="mt-8 w-full rounded-2xl bg-zinc-950 px-4 py-4 text-[14px] font-extrabold tracking-tight text-white shadow-lg active:scale-[0.98]"
            >
              clique  
            </button>

            <p className="mt-4 text-center text-xs text-zinc-600">
              Você tem valor. Sempre.
            </p>

          </div>
        </AnimatedBorderCard>
      </div>

      <style jsx global>{`
        .animated-bg {
          background: linear-gradient(-45deg, #93c5fd, #67e8f9, #86efac, #fde68a, #c4b5fd);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .heart {
          width: 48px;
          height: 48px;
          background: #ef4444;
          transform: rotate(-45deg);
          position: relative;
          animation: pulse 1.6s infinite;
          border-radius: 6px;
        }

        .heart::before,
        .heart::after {
          content: '';
          position: absolute;
          width: 48px;
          height: 48px;
          background: #ef4444;
          border-radius: 50%;
        }

        .heart::before {
          top: -24px;
          left: 0;
        }

        .heart::after {
          left: 24px;
          top: 0;
        }

        .heart-boost {
          animation: pulseBoost 0.3s ease;
        }

        @keyframes pulse {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.12); }
        }

        @keyframes pulseBoost {
          0% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.4); }
          100% { transform: rotate(-45deg) scale(1); }
        }

        .particle {
          position: absolute;
          left: 50%;
          top: 45%;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          animation-name: burst;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
          animation-fill-mode: forwards;
        }

        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) translate3d(0,0,0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate3d(var(--dx), var(--dy), 0);
            opacity: 0;
          }
        }
      `}</style>

    </main>
  )
}