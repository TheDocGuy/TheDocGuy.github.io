import Link from "next/link"
import { DMF_LEVELS, DMF_VERSION } from "@/lib/dmf"
import { cn } from "@/lib/utils"

const FILL: Record<number, string> = {
  1: "w-[14%] bg-[#3a2810]",
  2: "w-[30%] bg-[#6b3a0a]",
  3: "w-[52%] bg-[#a04e0a]",
  4: "w-[74%] bg-[#d07020]",
  5: "w-[94%] bg-linear-to-r from-ember-hot to-spark shadow-[0_0_8px_rgba(255,179,64,0.5)]",
}

export function MaturityStack({
  activeId,
  compact = false,
}: {
  activeId?: number
  compact?: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-ember/25 bg-iron/60 p-8 backdrop-blur-sm">
      <p className="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-ember-hot uppercase">
        Maturity Levels
      </p>
      <p className="absolute top-3.5 right-4 font-mono text-[0.62rem] tracking-widest text-ember-hot/90">
        DMF {DMF_VERSION}
      </p>
      <div className="flex flex-col gap-1.5">
        {DMF_LEVELS.map((level) => {
          const active = activeId === level.id
          const highlight = active || (activeId === undefined && level.id === 5)
          return (
            <Link
              key={level.id}
              href="/framework"
              className={cn(
                "flex items-center gap-3 rounded-sm border border-transparent px-3.5 py-2.5 transition-colors hover:border-ember/40 hover:bg-ember/10 motion-safe:transition-transform motion-safe:hover:translate-x-1",
                highlight && "border-ember/30 bg-ember/10",
              )}
            >
              <span
                className={cn(
                  "w-5 shrink-0 font-mono text-[0.72rem] text-ember-hot",
                  highlight && "text-spark",
                )}
              >
                {level.code}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-[0.83rem] font-semibold text-cream",
                    highlight && "text-spark",
                  )}
                >
                  {level.name}
                </div>
                {compact ? null : (
                  <div className="text-[0.71rem] leading-relaxed text-ash">{level.short}</div>
                )}
              </div>
              <div className={cn("h-1 shrink-0 rounded-sm", FILL[level.id])} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
