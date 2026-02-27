'use client'

import { useEffect, useState } from 'react'

type Particle = {
  id: string
  x: number
  size: number
  duration: number
  color: string
}

type Burst = {
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

export default function Page() {
  const [rain, setRain] = useState<Particle[]>([])
  const [bursts, setBursts] = useState<Burst[]>([])
  const [power, setPower] = useState(1)

  const MAX_BURSTS = 260
  const MAX_POWER = 10

  useEffect(() => {
    // pequena festa ao abrir (opcional)
    celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function celebrate() {
    const rainColors = ['#2563eb', '#0ea5e9', '#22c55e', '#f59e0b', '#7c3aed']
    const burstColors = ['#111827', '#1d4ed8', '#0ea5e9', '#16a34a', '#f59e0b', '#7c3aed']

    // chuva (cai)
    const drops: Particle[] = Array.from({ length: 40 }).map(() => ({
      id: uid(),
      x: Math.random() * 100,
      size: 8 + Math.random() * 12,
      duration: 2.2 + Math.random() * 1.6,
      color: rainColors[Math.floor(Math.random() * rainColors.length)]
    }))
    setRain(drops)
    setTimeout(() => setRain([]), 3600)

    // explosão (expande)
    const nextPower = Math.min(power + 1, MAX_POWER)
    setPower(nextPower)
    const count = 18 + nextPower * 10

    const created: Burst[] = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = 140 + Math.random() * 220
      return {
        id: uid(),
        size: 6 + Math.random() * 10,
        duration: 650 + Math.random() * 650,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        opacity: 0.7 + Math.random() * 0.3
      }
    })

    setBursts((prev) => {
      const merged = [...prev, ...created]
      if (merged.length <= MAX_BURSTS) return merged
      return merged.slice(merged.length - MAX_BURSTS)
    })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-900">
      {/* Fundo alegre animado */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_15%,white,transparent_35%),radial-gradient(circle_at_85%_18%,white,transparent_40%),radial-gradient(circle_at_35%_90%,white,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(0,0,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Centro pulsando */}
      <div className="pointer-events-none absolute inset-0">
        <div className="center-glow" />
      </div>

      {/* Chuva (cai) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {rain.map((d) => (
          <div
            key={d.id}
            style={{
              position: 'absolute',
              left: `${d.x}vw`,
              top: '-30px',
              width: d.size,
              height: d.size,
              borderRadius: 9999,
              backgroundColor: d.color,
              animation: `fall ${d.duration}s linear forwards`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
            }}
          />
        ))}
      </div>

      {/* Explosão (expande) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {bursts.map((p) => (
          <div
            key={p.id}
            onAnimationEnd={() => setBursts((prev) => prev.filter((x) => x.id !== p.id))}
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
        <section className="w-full rounded-3xl border border-black/10 bg-white/45 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.20)] backdrop-blur-2xl">
          <div className="text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-[12px] font-semibold tracking-wide text-zinc-700">
              Para você
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-zinc-950">
              ...deu-lhes o poder de serem chamados
              <br />
              filho(a) de Deus.
            </h1>


            <p className="mt-3 text-xs text-zinc-600">
              1 João 3:1
            </p>
          </div>

          <div className="mt-7">
            <button
              onClick={celebrate}
              className="w-full rounded-2xl bg-zinc-950 px-4 py-4 text-[14px] font-extrabold tracking-tight text-white shadow-lg active:scale-[0.98]"
            >
              Celebrar
            </button>

            <p className="mt-4 text-center text-xs text-zinc-600">
              Você tem valor. Sempre.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .animated-bg {
          background: linear-gradient(-45deg, #93c5fd, #67e8f9, #86efac, #fde68a, #c4b5fd);
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
          background: radial-gradient(circle, rgba(255,255,255,0.40), rgba(255,255,255,0) 62%);
          filter: blur(12px);
          animation: breathe 2.4s ease-in-out infinite;
          opacity: 0.95;
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.02); opacity: 1; }
        }

        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
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
          box-shadow: 0 0 18px rgba(0,0,0,0.12);
        }
        @keyframes burst {
          0% { transform: translate(-50%, -50%) translate3d(0,0,0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(-50%, -50%) translate3d(var(--dx), var(--dy), 0) scale(0.7); opacity: 0; }
        }
      `}</style>
    </main>
  )
}