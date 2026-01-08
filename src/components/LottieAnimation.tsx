'use client'

import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

interface LottieAnimationProps {
  className?: string
}

export default function LottieAnimation({ className = '' }: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationData, setAnimationData] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
          // Pause when not visible to save resources
          setShouldPlay(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isVisible])

  // Load animation only when visible
  useEffect(() => {
    if (!isVisible || animationData) return

    fetch('/animation-final.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error))
  }, [isVisible, animationData])

  // Control play/pause based on visibility
  useEffect(() => {
    if (lottieRef.current) {
      if (shouldPlay) {
        lottieRef.current.play()
      } else {
        lottieRef.current.pause()
      }
    }
  }, [shouldPlay])

  return (
    <div ref={containerRef} className={className}>
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={shouldPlay}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true
          }}
        />
      )}
    </div>
  )
}
