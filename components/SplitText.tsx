"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | number[]
  splitType?: "chars" | "words" | "lines" | "words, chars"
  from?: { opacity?: number; y?: number; x?: number }
  to?: { opacity?: number; y?: number; x?: number }
  threshold?: number
  rootMargin?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  textAlign?: React.CSSProperties["textAlign"]
  onLetterAnimationComplete?: () => void
  /** Keep hero text in one row; use with responsive font size */
  singleLine?: boolean
  style?: React.CSSProperties
}

const defaultFrom = { opacity: 0, y: 40 }
const defaultTo = { opacity: 1, y: 0 }

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = [0.22, 1, 0.36, 1],
  splitType = "chars",
  from = defaultFrom,
  to = defaultTo,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
  singleLine = false,
  style: styleProp,
}) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin as `${number}px` | `${number}%`,
  })
  const [hasCompleted, setHasCompleted] = useState(false)

  const useChars = splitType.includes("chars")
  const useWords = splitType.includes("words")

  const chars = useChars ? text.split("") : []
  const words = useWords && !useChars ? text.split(/\s+/) : []

  const handleAnimationComplete = () => {
    if (!hasCompleted) {
      setHasCompleted(true)
      onLetterAnimationComplete?.()
    }
  }

  const containerStyle: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: singleLine ? "nowrap" : "normal",
    wordWrap: singleLine ? "normal" : "break-word",
    ...styleProp,
  }

  const Tag = tag as keyof JSX.IntrinsicElements

  if (useChars && chars.length > 0) {
    // Group characters by word so line breaks only happen between words
    const wordGroups: { word: string; startIndex: number }[] = []
    let currentWord = ""
    let currentStart = 0
    chars.forEach((char, i) => {
      if (char === " ") {
        if (currentWord) {
          wordGroups.push({ word: currentWord, startIndex: currentStart })
          currentWord = ""
        }
        // Push the space as its own group
        wordGroups.push({ word: " ", startIndex: i })
        currentStart = i + 1
      } else {
        if (!currentWord) currentStart = i
        currentWord += char
      }
    })
    if (currentWord) {
      wordGroups.push({ word: currentWord, startIndex: currentStart })
    }

    return (
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
        style={containerStyle}
        className={`split-parent ${className}`}
      >
        {wordGroups.map((group) => {
          if (group.word === " ") {
            return (
              <span key={`space-${group.startIndex}`} className="inline">{"\u00A0"}</span>
            )
          }
          return (
            <span key={`word-${group.startIndex}`} className="inline-block whitespace-nowrap">
              {group.word.split("").map((char, ci) => {
                const globalIndex = group.startIndex + ci
                return (
                  <motion.span
                    key={`${globalIndex}-${char}`}
                    className="split-char inline-block"
                    initial={from}
                    animate={isInView ? to : from}
                    transition={{
                      duration,
                      delay: globalIndex * (delay / 1000),
                      ease: Array.isArray(ease) ? ease : (ease as string),
                    }}
                    onAnimationComplete={
                      globalIndex === chars.length - 1 ? handleAnimationComplete : undefined
                    }
                  >
                    {char}
                  </motion.span>
                )
              })}
            </span>
          )
        })}
      </Tag>
    )
  }

  if (useWords && words.length > 0) {
    return (
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
        style={containerStyle}
        className={`split-parent ${className}`}
      >
        {words.map((word, wi) => (
          <motion.span
            key={`${wi}-${word}`}
            className="split-word inline-block"
            initial={from}
            animate={isInView ? to : from}
            transition={{
              duration,
              delay: wi * (delay / 1000),
              ease: Array.isArray(ease) ? ease : (ease as string),
            }}
            onAnimationComplete={wi === words.length - 1 ? handleAnimationComplete : undefined}
          >
            {word}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      style={containerStyle}
      className={`split-parent ${className}`}
    >
      <motion.span
        initial={from}
        animate={isInView ? to : from}
        transition={{ duration, ease: Array.isArray(ease) ? ease : (ease as string) }}
        onAnimationComplete={handleAnimationComplete}
      >
        {text}
      </motion.span>
    </Tag>
  )
}

export default SplitText
