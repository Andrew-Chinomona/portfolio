"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const PROMPTS = [
  "Need a website?",
  "Need an internal system?",
  "Need automation?",
  "Need a brand refresh?",
  "Need custom software?",
]

const LOADING_LINE = "loading"
const FINAL_LINE = "get in touch"

const TYPE_DELAY_MS = 60
const PAUSE_AFTER_LINE_MS = 1200
const PAUSE_BEFORE_NEXT_MS = 400

const glowStyle = {
  textShadow:
    "0 0 4px rgb(52 211 153 / 0.5), 0 0 8px rgb(52 211 153 / 0.3)",
}

// Total prompts + loading dots + get in touch
const TOTAL_STEPS = PROMPTS.length + 2

export function HeroTerminal() {
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [visibleText, setVisibleText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [finished, setFinished] = useState(false)
  const [dotCount, setDotCount] = useState(1)

  const isLoadingStep = stepIndex === PROMPTS.length
  const isFinalStep = stepIndex === PROMPTS.length + 1

  const currentPrompt = isLoadingStep
    ? LOADING_LINE
    : isFinalStep
      ? FINAL_LINE
      : PROMPTS[stepIndex]

  // Typing effect
  useEffect(() => {
    if (finished || !currentPrompt) return

    // Loading step: don't type, just wait then move on
    if (isLoadingStep) return

    if (visibleText.length < currentPrompt.length) {
      const timer = setTimeout(() => {
        setVisibleText(currentPrompt.slice(0, visibleText.length + 1))
      }, TYPE_DELAY_MS)
      return () => clearTimeout(timer)
    }

    // Line complete: keep it, then go to next (or finish)
    const nextTimer = setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentPrompt])
      setVisibleText("")
      if (isFinalStep) {
        setFinished(true)
      } else {
        setStepIndex((i) => i + 1)
      }
    }, PAUSE_AFTER_LINE_MS + PAUSE_BEFORE_NEXT_MS)

    return () => clearTimeout(nextTimer)
  }, [currentPrompt, visibleText, stepIndex, isLoadingStep, isFinalStep, finished])

  // Loading dots animation (cycles 1→2→3→1...)
  useEffect(() => {
    if (!isLoadingStep || finished) return
    const id = setInterval(() => {
      setDotCount((c) => (c % 3) + 1)
    }, 500)
    return () => clearInterval(id)
  }, [isLoadingStep, finished])

  // Auto-advance loading step after ~2.5 seconds
  useEffect(() => {
    if (!isLoadingStep || finished) return
    const timer = setTimeout(() => {
      setCompletedLines((prev) => [...prev, LOADING_LINE])
      setVisibleText("")
      setStepIndex((i) => i + 1)
    }, 2500)
    return () => clearTimeout(timer)
  }, [isLoadingStep, finished])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(id)
  }, [])

  const isGlowLine = (line: string) => line === LOADING_LINE || line === FINAL_LINE

  const renderCompletedLine = (line: string, i: number) => {
    const glow = isGlowLine(line)

    if (line === LOADING_LINE) {
      return (
        <div key={i} className="flex items-center gap-2">
          <span className="text-emerald-400 shrink-0">$</span>
          <span className="text-emerald-400 font-medium" style={glowStyle}>
            ...
          </span>
        </div>
      )
    }

    if (line === FINAL_LINE) {
      return (
        <div key={i} className="flex items-center gap-2">
          <span className="text-emerald-400 shrink-0">$</span>
          <Link
            href="/contact"
            className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors cursor-pointer"
            style={glowStyle}
          >
            get in touch
          </Link>
        </div>
      )
    }

    return (
      <div key={i} className="flex items-center gap-2">
        <span className="text-emerald-400 shrink-0">$</span>
        <span className={glow ? "text-emerald-400 font-medium" : "text-white/90"} style={glow ? glowStyle : undefined}>
          {line}
        </span>
      </div>
    )
  }

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-white/20 bg-black/60 shadow-xl backdrop-blur-sm">
      {/* Title bar - Mac-style dots: green, yellow, red */}
      <div className="flex items-center gap-2.5 border-b border-white/20 px-5 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#34c749]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        </div>
        <span className="ml-2 text-sm text-white/50 font-medium">terminal</span>
      </div>
      {/* Content */}
      <div className="p-5 font-mono text-base text-white/90 min-h-[6.5rem] max-h-80 overflow-y-auto">
        {completedLines.map((line, i) => renderCompletedLine(line, i))}

        {!finished && (
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 shrink-0">$</span>
            <div className="flex flex-wrap items-center gap-0.5 overflow-hidden">
              {isLoadingStep ? (
                <span className="text-emerald-400 font-medium" style={glowStyle}>
                  {".".repeat(dotCount)}
                </span>
              ) : (
                <span
                  className={isFinalStep ? "text-emerald-400 font-medium" : "text-white/90"}
                  style={isFinalStep ? glowStyle : undefined}
                >
                  {visibleText}
                </span>
              )}
              <span
                className={`inline-block w-2.5 h-5 bg-emerald-400/90 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
                style={{ marginLeft: "1px" }}
                aria-hidden
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
