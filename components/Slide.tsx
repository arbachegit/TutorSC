'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSlideContext } from './SlideEngine'

type SlideVariant =
  | 'title'
  | 'section'
  | 'quote'
  | 'stats'
  | 'content'
  | 'image'
  | 'video'
  | 'blank'

interface SlideProps {
  index: number
  variant?: SlideVariant
  children: ReactNode
  className?: string
  style?: CSSProperties
  bg?: string
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function Slide({
  index,
  variant = 'blank',
  children,
  className = '',
  style,
  bg,
}: SlideProps) {
  const { currentSlide, seenSlides } = useSlideContext()
  const isActive = currentSlide === index
  const wasSeen = seenSlides.has(index)

  const bandRef = useRef<HTMLDivElement>(null)
  const fitRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(1)
  const [scale, setScale] = useState(1)
  const offsetRef = useRef(0)
  const [offsetY, setOffsetY] = useState(0)
  const [animReady, setAnimReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useIsoLayoutEffect(() => {
    const band = bandRef.current
    const fit = fitRef.current
    if (!band || !fit) return

    const measure = () => {
      const cs = getComputedStyle(band)
      const padTop = parseFloat(cs.paddingTop) || 0
      const padBot = parseFloat(cs.paddingBottom) || 0
      const available = band.clientHeight - padTop - padBot
      const prevTransform = fit.style.transform
      fit.style.transform = 'none'
      const fitTop = fit.getBoundingClientRect().top
      let unionBot = fitTop
      fit.querySelectorAll('*').forEach((node) => {
        const r = (node as HTMLElement).getBoundingClientRect()
        if (r.height < 1 || r.width < 1) return
        if (r.bottom > unionBot) unionBot = r.bottom
      })
      fit.style.transform = prevTransform
      const unionH = unionBot - fitTop
      const natural = Math.max(fit.scrollHeight, unionH)
      if (available <= 0 || natural <= 0) return
      const target = available * 0.88
      const next = natural > target ? Math.max(0.2, target / natural) : 1
      const scaledH = natural * next
      const nextOffset = Math.max(0, (available - scaledH) / 2)
      if (Math.abs(next - scaleRef.current) > 0.004) {
        scaleRef.current = next
        setScale(next)
      }
      if (Math.abs(nextOffset - offsetRef.current) > 0.5) {
        offsetRef.current = nextOffset
        setOffsetY(nextOffset)
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(fit)
    ro.observe(band)
    window.addEventListener('resize', measure)
    const timers = [60, 200, 500, 1000, 1900].map((ms) => window.setTimeout(measure, ms))
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {})
    }
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [children, isActive])

  const bgStyle: CSSProperties = bg ? { background: bg, ...style } : { ...style }

  return (
    <section
      className={`slide slide--${variant} ${className}`}
      data-active={isActive}
      data-seen={wasSeen}
      data-index={index}
      style={bgStyle}
    >
      <div ref={bandRef} className="slide-inner">
        <div
          ref={fitRef}
          className="slide-fit"
          style={{
            transform:
              scale < 1 || offsetY > 0
                ? `translateY(${offsetY}px) scale(${scale})`
                : undefined,
            transformOrigin: 'center top',
            transition: animReady ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
