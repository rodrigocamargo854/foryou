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
            rgba(34, 211, 238, 0.75) 70deg,
            rgba(52, 211, 153, 0.75) 140deg,
            rgba(253, 224, 71, 0.75) 210deg,
            rgba(167, 139, 250, 0.75) 280deg,
            rgba(37, 99, 235, 0.75) 360deg
          );
          filter: blur(10px);
          opacity: 0.9;
          animation: ringSpin 5.2s linear infinite, ringPulse 2.2s ease-in-out infinite;

          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 11px;
        }

        @keyframes ringSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.65;
            filter: blur(10px);
          }
          50% {
            opacity: 1;
            filter: blur(12px);
          }
        }
      `}</style>
    </div>
  )
}

export default function Page() {
  const lines = useMemo(
    () => [
      'Fomos chamados',
      'filhos de Deus.'
    ],
    []
  )

  const [showText, setShowText] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [power, setPower] = useState(1)

  const MAX_PARTICLES = 260
  const MAX_POWER = 10

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 220)
    return () => clearTimeout(t)
  }, [])

  function celebrate() {
    const palette = ['#111827', '#1d4ed8', '#0ea5e9', '#16a34a', '#f59e0b', '#7c3aed']

    const nextPower = Math.min(power + 1, MAX_POWER)
    setPower(nextPower)

    const count = 16 + nextPower * 10

    const created: Particle[] = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = 140 + Math.random() * 220
      const dx = Math.cos(angle) * radius
      const dy = Math.sin(angle) * radius

      return {
        id: uid(),
        size: 6 + Math.random() * 10,
        duration: 650 + Math.random() * 650,
        dx,
        dy,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 0.75 + Math.random() * 0.25
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
      {/* Background animado claro */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_15%,white,transparent_35%),radial-gradient(circle_at_85%_18%,white,transparent_40%),radial-gradient(circle_at_35%_90%,white,transparent_45%)]" />

      {/* grid suave */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(0,0,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />

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
        <AnimatedBorderCard>
          <div className="text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-[12px] font-semibold tracking-wide text-zinc-700">
              Cartão
            </div>

            {showText && (
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-zinc-950">
                {lines[0]}
                <br />
                {lines[1]}
              </h1>
            )}

            <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
              Olha o amor que Deus nos deu.
            </p>

            <p className="mt-3 text-xs text-zinc-600">1 João 3:1</p>

            <div className="mt-7">
              <button
                onClick={celebrate}
                className="w-full rounded-2xl bg-zinc-950 px-4 py-4 text-[14px] font-extrabold tracking-tight text-white shadow-lg active:scale-[0.98]"
              >
                try 
              </button>

              <p className="mt-4 text-center text-xs text-zinc-600">
                Você é um cidadão do céu!
              </p>
            </div>
          </div>
        </AnimatedBorderCard>
      </div>

      {/* CSS global */}
      <style jsx global>{`
        .animated-bg {
          background: linear-gradient(-45deg, #93c5fd, #67e8f9, #86efac, #fde68a, #c4b5fd);
          background-size: 450% 450%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
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
          box-shadow: 0 0 18px rgba(0, 0, 0, 0.12);
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