import Image from 'next/image'

interface LogoProps {
  className?: string
  useNextImage?: boolean
}

export default function Logo({ className = '', useNextImage = true }: LogoProps) {
  if (useNextImage) {
    return (
      <Image 
        src="/images/clarke-logo.png" 
        alt="Clarke" 
        fill
        className={`object-contain ${className}`}
        priority
      />
    )
  }

  // Fallback to regular img tag for better static export compatibility
  return (
    <img 
      src="/images/clarke-logo.png" 
      alt="Clarke" 
      className={`w-full h-full object-contain ${className}`}
    />
  )
}

