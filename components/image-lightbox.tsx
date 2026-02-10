"use client"

import { useState, useCallback } from "react"
import { X } from "lucide-react"

type ImageWithLightboxProps = {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
}

export function ImageWithLightbox({ src, alt, children, className = "" }: ImageWithLightboxProps) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#629FAD] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
        aria-label={`View full size: ${alt}`}
      >
        {children}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="flex items-center justify-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
