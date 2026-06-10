'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface SlideContextValue {
  currentSlide: number
  totalSlides: number
  seenSlides: Set<number>
  goTo: (index: number) => void
}

const SlideCtx = createContext<SlideContextValue>({
  currentSlide: 0,
  totalSlides: 0,
  seenSlides: new Set([0]),
  goTo: () => {},
})

export function useSlideContext() {
  return useContext(SlideCtx)
}

export function SlideEngine({
  children,
  totalSlides,
}: {
  children: ReactNode
  totalSlides: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1))
      const container = containerRef.current
      if (!container) return
      container.scrollTo({ left: clamped * container.clientWidth, behavior: 'smooth' })
    },
    [totalSlides],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const w = container.clientWidth
      if (w === 0) return
      const raw = container.scrollLeft / w
      const index = Math.round(raw)
      if (Math.abs(raw - index) < 0.2) {
        setCurrent(index)
        setSeen(prev => {
          if (prev.has(index)) return prev
          const next = new Set(prev)
          next.add(index)
          return next
        })
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const handleResize = () => {
      const w = container.clientWidth
      if (w === 0) return
      container.scrollTo({ left: current * w })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [current])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          goTo(current + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goTo(current - 1)
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(totalSlides - 1)
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, totalSlides, goTo])

  // Block vertical wheel from causing slide displacement.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <SlideCtx.Provider value={{ currentSlide: current, totalSlides, seenSlides: seen, goTo }}>
      <div ref={containerRef} className="slide-container">
        {children}
      </div>
    </SlideCtx.Provider>
  )
}
