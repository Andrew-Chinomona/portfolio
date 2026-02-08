"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type SplitType = "chars" | "words" | "lines"

type SplitTextTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: SplitType
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: React.CSSProperties["textAlign"]
  noWrap?: boolean
  tag?: SplitTextTag
  onLetterAnimationComplete?: () => void
}

function splitIntoWordsWithSpaces(text: string) {
  // Preserve spaces as separate tokens so wrapping stays natural
  return text.split(/(\s+)/).filter((t) => t.length > 0)
}

export default function SplitText({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  noWrap = false,
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const segmentsRef = useRef<HTMLSpanElement[]>([])
  const animationCompletedRef = useRef(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Ensure layout is stable before measuring/animating
    if (typeof document === "undefined" || !("fonts" in document)) {
      setFontsLoaded(true)
      return
    }
    // @ts-expect-error document.fonts exists in modern browsers
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true)
    } else {
      // @ts-expect-error document.fonts exists in modern browsers
      document.fonts.ready.then(() => setFontsLoaded(true))
    }
  }, [])

  const segments = useMemo(() => {
    if (!text) return []
    if (splitType === "words") return splitIntoWordsWithSpaces(text)
    if (splitType === "lines") return splitIntoWordsWithSpaces(text) // best-effort fallback
    // chars: keep spaces as tokens too
    return Array.from(text)
  }, [text, splitType])

  useGSAP(
    () => {
      const el = rootRef.current
      if (!el || !text || !fontsLoaded) return

      const targets = segmentsRef.current.filter(Boolean)
      if (targets.length === 0) return

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px"
      const sign =
        marginValue === 0 ? "" : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`
      const start = `top ${startPct}%${sign}`

      // Kill any previous ScrollTrigger for this element
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })

      // Reset
      gsap.set(targets, { ...from })

      const tween = gsap.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
          anticipatePin: 0.4,
        },
        onComplete: () => {
          if (animationCompletedRef.current) return
          animationCompletedRef.current = true
          onLetterAnimationComplete?.()
        },
        willChange: "transform, opacity",
        force3D: true,
      })

      return () => {
        tween.kill()
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill()
        })
      }
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete,
      ],
    },
  )

  const style: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: noWrap ? "nowrap" : "normal",
    wordWrap: noWrap ? "normal" : "break-word",
    willChange: "transform, opacity",
  }

  const classes = `split-parent ${className}`

  const content = (
    <>
      {segments.map((seg, i) => (
        <span
          key={`${seg}-${i}`}
          ref={(node) => {
            if (!node) return
            segmentsRef.current[i] = node
          }}
          className="inline-block will-change-transform"
        >
          {seg === " " ? "\u00A0" : seg}
        </span>
      ))}
    </>
  )

  if (tag === "h1") {
    return (
      <h1 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h1>
    )
  }
  if (tag === "h2") {
    return (
      <h2 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h2>
    )
  }
  if (tag === "h3") {
    return (
      <h3 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h3>
    )
  }
  if (tag === "h4") {
    return (
      <h4 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h4>
    )
  }
  if (tag === "h5") {
    return (
      <h5 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h5>
    )
  }
  if (tag === "h6") {
    return (
      <h6 ref={(n) => (rootRef.current = n)} style={style} className={classes}>
        {content}
      </h6>
    )
  }

  return (
    <p ref={(n) => (rootRef.current = n)} style={style} className={classes}>
      {content}
    </p>
  )
}


