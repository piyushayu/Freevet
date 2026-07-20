import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Stethoscope, ShieldAlert } from "lucide-react"

function Diseasecard({
  Name,
  name = Name,
  context,
  Info = [],
  info = Info,
  severity,
  link
}) {
  const diseaseName = name || "Disease Name"
  const diseaseContext = context || ""
  const symptomsList = Array.isArray(info) ? info.slice(0, 3) : []

  const badgeText = severity || "Moderate"
  const isHigh = badgeText.toLowerCase().includes("high")

  const themeClass = isHigh
    ? "bg-neutral-800/40 border-rose-500/40 text-rose-400"
    : "bg-neutral-800/40 border-amber-500/40 text-amber-400"

  const dotClass = isHigh ? "bg-rose-500" : "bg-amber-500"
  const Icon = isHigh ? ShieldAlert : Stethoscope
  const targetLink = link || `explain/${encodeURIComponent(diseaseName)}`

  return (
    <div className="w-full max-w-85 bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700/90 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 group relative">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-start">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${themeClass}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-left">
          <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white transition-colors tracking-tight">
            {diseaseName}
          </h3>
          {diseaseContext && (
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              {diseaseContext}
            </p>
          )}
        </div>

        <div className="flex items-center text-left">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${themeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {badgeText}
          </span>
        </div>

        {symptomsList.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 text-left">
            {symptomsList.map((symptom, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-350 leading-normal">
                <span className="text-neutral-500 font-bold">•</span>
                <span className="line-clamp-1">{symptom}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          to={targetLink}
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-950/60 hover:bg-neutral-800/80 text-neutral-200 hover:text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
        </Link>
      </div>
    </div>
  )
}

export default Diseasecard