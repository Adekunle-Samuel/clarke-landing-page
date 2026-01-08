'use client'

import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

interface LottieAnimationProps {
  className?: string
}

export default function LottieAnimation({ className = '' }: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error))
  }, [])

  if (!animationData) {
    return <div className={className} />
  }

  return (
    <div className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
    </div>
  )
}
