'use client'

import { useMemo, useState } from 'react'

type Particle = {
  id: string
  duration: number
  dx: number
  dy: number
  color: string
  size: number
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
            rgba(34, 211, 238, 0.8),
            rgba(52, 211, 153, 0.8),
            rgba(253, 224, 71, 0.8),
            rgba(167, 139, 250, 0.8),
            rgba(34, 211, 238, 0.8)
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
  const [boost, setBoost] = useState(false)

  function celebrate() {
    setBoost(true)
    setTimeout(() => setBoost(false), 300)

    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']

    const created: Particle[] = Array.from({ length: 30 }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = 120 + Math.random() * 180

      return {
        id: uid(),
        duration: 800 + Math.random() * 600,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 10 + Math.random() * 8
      }
    })

    setParticles((prev) => [...prev, ...created])
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-900">

      {/* Background */}
      <div className="absolute inset-0 animated-bg" />

      {/* Mini corações */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {particles.map((p) => (
          <div
            key={p.id}
            onAnimationEnd={() =>
              setParticles((prev) => prev.filter((x) => x.id !== p.id))
            }
            className="particle"
            style={
              {
                width: p.size,
                height: p.size,
                color: p.color,
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

            {/* Coração principal */}
            <div className="mt-8 flex justify-center">
              <div className={`heart ${boost ? 'heart-boost' : ''}`} />
            </div>

            <button
              onClick={celebrate}
              className="mt-8 w-full rounded-2xl bg-zinc-950 px-4 py-4 text-[14px] font-extrabold tracking-tight text-white shadow-lg active:scale-[0.98]"
            >
              Click
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
          width: 52px;
          height: 52px;
          background: #ef4444;
          transform: rotate(-45deg);
          position: relative;
          animation: pulse 1.6s infinite;
        }

        .heart::before,
        .heart::after {
          content: '';
          position: absolute;
          width: 52px;
          height: 52px;
          background: #ef4444;
          border-radius: 50%;
        }

        .heart::before {
          top: -26px;
          left: 0;
        }

        .heart::after {
          left: 26px;
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

        /* Mini corações */
        .particle {
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%) rotate(-45deg);
          background: currentColor;
          animation-name: burst;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
          animation-fill-mode: forwards;
        }

        .particle::before,
        .particle::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: currentColor;
          border-radius: 50%;
        }

        .particle::before {
          top: -50%;
          left: 0;
        }

        .particle::after {
          left: 50%;
          top: 0;
        }

        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate3d(var(--dx), var(--dy), 0) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>

    </main>
  )
}