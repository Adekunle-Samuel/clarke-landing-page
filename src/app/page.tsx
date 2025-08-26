'use client'

import { useState, useEffect } from 'react'
//import { supabase } from '@/lib/supabase'
import { addToWaitlist, addPartner } from '@/lib/supabase-utils'
import Script from 'next/script'
//import SupabaseStatus from '@/components/SupabaseStatus'
import Logo from '@/components/Logo'

// Type definitions for FinisherHeader
declare global {
  interface Window {
    FinisherHeader: {
      new (config: {
        count: number
        size: { min: number; max: number; pulse: number }
        speed: { x: { min: number; max: number }; y: { min: number; max: number } }
        colors: { background: string; particles: string[] }
        blending: string
        opacity: { center: number; edge: number }
        skew: number
        shapes: string[]
      }): unknown
    }
  }
}

// Supabase client is now imported from @/lib/supabase

// Skip link component for accessibility
const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50"
  >
    Skip to main content
  </a>
)

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  // Partner form state
  const [brandName, setBrandName] = useState('')
  const [brandEmail, setBrandEmail] = useState('')
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false)
  const [partnerMessage, setPartnerMessage] = useState('')
  const [showPartnerForm, setShowPartnerForm] = useState(false)

  // Success popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showPartnerSuccessPopup, setShowPartnerSuccessPopup] = useState(false)

  // Initialize Finisher Header after component mounts
  useEffect(() => {
    const initFinisherHeader = () => {
      if (typeof window !== 'undefined' && window.FinisherHeader) {
        new window.FinisherHeader({
          "count": 12,
          "size": {
            "min": 1334,
            "max": 1500,
            "pulse": 0
          },
          "speed": {
            "x": {
              "min": 0.6,
              "max": 2.5
            },
            "y": {
              "min": 0.6,
              "max": 3
            }
          },
          "colors": {
            "background": "#e6f7e6",
            "particles": [
              "#f9fae4",
              "#e6f7e6",
              "#d896c2",
              "#D99C63"
            ]
          },
          "blending": "lighten",
          "opacity": {
            "center": 0.6,
            "edge": 0
          },
          "skew": -2,
          "shapes": [
            "c"
          ]
        });
      }
    };

    // Try to initialize immediately
    initFinisherHeader();

    // If not available, wait a bit and try again
    const timer = setTimeout(initFinisherHeader, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Close partner form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showPartnerForm && !target.closest('nav')) {
        setShowPartnerForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPartnerForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await addToWaitlist({ name, email })
      setName('')
      setEmail('')
      setShowForm(false)
      setShowSuccessPopup(true)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPartnerSubmitting(true)
    setPartnerMessage('')

    try {
      await addPartner({ brand_name: brandName, email: brandEmail })
      setBrandName('')
      setBrandEmail('')
      setShowPartnerForm(false)
      setShowPartnerSuccessPopup(true)
    } catch (error) {
      setPartnerMessage('Something went wrong. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsPartnerSubmitting(false)
    }
  }

  return (
    <>
      <Script src="/finisher-header.es5.min.js" strategy="afterInteractive" />

      <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#e6f7e6' }}>
        {/* Finisher Header Background */}
        <div className="header finisher-header" style={{ width: '100vw', height: '100%', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }} />
        
        <SkipLink />
        
        {/* Header Navigation */}
        <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 lg:px-20 pt-8 lg:pt-[47px] max-w-[1400px] mx-auto">
          {/* Logo */}
          <div className="h-[30px] w-[60px] sm:h-[37.284px] sm:w-[70.476px] relative">
            <Logo useNextImage={false} />
          </div>
          
          {/* Navigation Right Side */}
          <nav className="flex gap-4 sm:gap-[29px] items-center relative">
            {/* Email Button */}
            <a 
              href="mailto:sam@useclarke.app"
              className="relative overflow-hidden rounded-xl px-4 lg:px-6 py-2 lg:py-3 font-sans font-normal text-[#F9FAE4] text-[11px] lg:text-[14px] tracking-[-0.4px] leading-[1.3] bg-[#6E4D2E] backdrop-blur-sm border border-[#6E4D2E]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group hover:bg-white/30"
              aria-label="Send email to sam@useclarke.app"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </a>
            
            <button 
              onClick={() => setShowPartnerForm(!showPartnerForm)}
              className="relative overflow-hidden rounded-xl px-4 lg:px-6 py-2 lg:py-3 font-sans font-normal text-[#6b6b6b] text-[11px] lg:text-[14px] tracking-[-0.4px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-[#6E4D2E]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group"
              aria-label="Contact us for brand partnerships"
            >
              <span className="relative z-10">Partner with us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
            
            {/* Partner Form Dropdown */}
            {showPartnerForm && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl z-40 animate-in slide-in-from-top-2 duration-300">
                <form onSubmit={handlePartnerSubmit} className="flex flex-col gap-4">
                  <h3 className="font-serif text-[#6e4d2e] text-sm tracking-[-0.3px] leading-[1.2] font-medium mb-2">
                    PARTNER WITH CLARKE
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Brand Name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="bg-white/80 backdrop-blur-sm py-2 outline-none border-0 border border-[#A3A3A3] focus:border-[#2ecc71] focus:bg-white/20 rounded-lg font-sans text-[#6b6b6b] text-sm tracking-[-0.2px] px-3 transition-all duration-300 placeholder:text-[#A3A3A3] placeholder:font-normal w-full shadow-sm"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                      className="bg-white/80 backdrop-blur-sm py-2 outline-none border-0 border border-[#A3A3A3] focus:border-[#2ecc71] focus:bg-white/20 rounded-lg font-sans text-[#6b6b6b] text-sm tracking-[-0.2px] px-3 transition-all duration-300 placeholder:text-[#A3A3A3] placeholder:font-normal w-full shadow-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPartnerSubmitting}
                    className="relative overflow-hidden rounded-xl px-6 py-3 font-sans font-medium text-[#6b6b6b] text-sm tracking-[-0.3px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group mt-2"
                  >
                    <span className="relative z-10">{isPartnerSubmitting ? 'Submitting...' : 'Submit'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  </button>

                  {partnerMessage && (
                    <p 
                      className={`text-xs ${partnerMessage.includes('Thank you') ? 'text-[#2ecc71]' : 'text-red-500'}`}
                      role="alert"
                      aria-live="polite"
                    >
                      {partnerMessage}
                    </p>
                  )}
                </form>
              </div>
            )}
          </nav>
        </header>

        <main id="main-content" className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-20">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mt-16 lg:mt-[80px]">
            {/* Badge */}
            <div className="glass-effect-subtle flex items-center justify-center px-3 py-2 w-fit rounded-lg mb-8">
              <span className="font-sans font-medium text-[13px] tracking-[1px] leading-[1.2] text-[#6b6b6b]">
               AI-POWERED SHOPPING FOR YOU
              </span>
            </div>
            
            {/* Main Heading - Full Width */}
            <h1 className="font-serif text-[#6e4d2e] text-4xl sm:text-5xl lg:text-[64px] tracking-[-2.5px] leading-[1.1] font-medium max-w-[1200px] mb-8">
              Remove the guesswork,<br className="hidden sm:block"/> shop your size with certainty
            </h1>
            
            {/* Subtitle */}
            <p className="font-sans font-normal text-[#6b6b6b] text-lg sm:text-xl lg:text-[20px] tracking-[-0.6px] leading-[1.35] max-w-[800px] mb-12">
              Find clothes you'll actually love in your size. Clarke filters thousands of brands to show only what fits your size and matches your vibe
            </p>
            
            {/* Toggle Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="relative overflow-hidden rounded-2xl px-8 lg:px-12 py-4 lg:py-5 font-sans font-medium text-[#6b6b6b] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-[#6E4D2E]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 mb-8 group"
            >
              <span className="relative z-10">{showForm ? 'Hide Form' : 'Join the Priority List'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
            
            {/* Form Overlay - Conditionally Rendered */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                  onClick={() => setShowForm(false)}
                />
                
                {/* Modal Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-[60px] w-full max-w-[600px] relative z-10 animate-in zoom-in-95 duration-300 border border-gray-200 shadow-2xl">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 text-[#6b6b6b] hover:text-[#2ecc71] transition-colors p-2"
                    aria-label="Close form"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:gap-12">
                    {/* Form Header */}
                    <div className="text-center mb-4">
                      <h2 className="font-serif text-[#6e4d2e] text-2xl lg:text-3xl tracking-[-0.5px] leading-[1.2] font-medium">
                        Get Early Access
                      </h2>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        {/* <label htmlFor="name" className="font-sans font-medium text-[#374151] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.4]">
                          Name
                        </label> */}
                        <input
                          id="name"
                          type="text"
                          placeholder="First Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white/80 backdrop-blur-sm py-3 outline-none border-0 border border-[#A3A3A3] focus:border-[#2ecc71] focus:bg-white/20 rounded-lg font-sans text-[#6b6b6b] text-base tracking-[-0.2px] px-4 transition-all duration-300 placeholder:text-[#A3A3A3] placeholder:font-normal w-full shadow-sm"
                          required
                          aria-describedby="name-error"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                       {/* <label htmlFor="email" className="font-sans font-medium text-[#374151] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.4]">
                          Email Address
                        </label> */}
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/80 backdrop-blur-sm py-3 outline-none border-0 border border-[#A3A3A3] focus:border-[#2ecc71] focus:bg-white/20 rounded-lg font-sans text-[#6b6b6b] text-base tracking-[-0.2px] px-4 transition-all duration-300 placeholder:text-[#A3A3A3] placeholder:font-normal w-full shadow-sm"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden rounded-2xl px-8 lg:px-12 py-4 lg:py-5 font-sans font-medium text-[#6b6b6b] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group"
                    >
                      <span className="relative z-10">{isSubmitting ? 'Joining...' : 'Submit'}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    </button>

                    {message && (
                      <p 
                        className={`text-sm ${message.includes('Thank you') ? 'text-[#2ecc71]' : 'text-red-500'}`}
                        role="alert"
                        aria-live="polite"
                      >
                        {message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-[40px] mt-16 lg:mt-[80px] pb-20">
            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3 className="font-serif font-medium text-[#6b6b6b] text-regular text-[16px] sm:text-[18px] tracking-[-0.3px] leading-[1.5]">
                Start with you
              </h3>
              <p className="font-sans font-normal text-[#6b6b6b] text-xs sm:text-sm lg:text-[14px] tracking-[-0.5px] leading-[1.5]">
                Tell us what you want, we find only items that can fit your size, mood, budget and fit
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3  className="font-serif font-medium text-[#6b6b6b] text-regular text-[16px] sm:text-[18px] tracking-[-0.3px] leading-[1.5]">
                Not in your size?
              </h3>
              <p className="font-sans font-normal text-[#6b6b6b] text-xs sm:text-sm lg:text-[14px] tracking-[-0.5px] leading-[1.5]">
                Why show it in the first place? We only show you what truly comes in your size.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3 className="font-serif font-medium text-[#6b6b6b] text-regular text-[16px] sm:text-[18px] tracking-[-0.3px] leading-[1.5]">
                Discover new pieces
              </h3>
              <p className="font-sans font-normal text-[#6b6b6b] text-xs sm:text-sm lg:text-[14px] tracking-[-0.5px] leading-[1.5]">
                Shop indie brands, mainstreet brands all in one place. Unique pieces from 1000+ brands in one place
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3 className="font-serif font-medium text-[#6b6b6b] text-regular text-[16px] sm:text-[18px] tracking-[-0.3px] leading-[1.5]">
                Shop the yeses
              </h3>
              <p className="font-sans font-normal text-[#6b6b6b] text-xs sm:text-sm lg:text-[14px] tracking-[-0.5px] leading-[1.5]">
                Clarke shows you a clean feed of ready-to-shop picks - no charts, no guesswork.
              </p>
            </div>
          </div>
        </main>

        {/* Success Popup for Waitlist */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowSuccessPopup(false)}
            />
            
            {/* Modal Content */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-[60px] w-full max-w-[500px] relative z-10 animate-in zoom-in-95 duration-300 border border-gray-200 shadow-2xl text-center">
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-[#6b6b6b] hover:text-[#2ecc71] transition-colors p-2"
                aria-label="Close success message"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Success Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-[#2ecc71]/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              
              {/* Success Message */}
              <h2 className="font-serif text-[#6e4d2e] text-2xl lg:text-3xl tracking-[-0.5px] leading-[1.2] font-medium mb-4">
                Welcome to Clarke!
              </h2>
              
              <p className="font-sans font-normal text-[#6b6b6b] text-base lg:text-lg tracking-[-0.3px] leading-[1.4] mb-8">
                Thank you for joining our priority list! We'll notify you as soon as Clarke is ready to transform your shopping experience.
              </p>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="relative overflow-hidden rounded-2xl px-8 lg:px-12 py-4 lg:py-5 font-sans font-medium text-[#6b6b6b] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group"
              >
                <span className="relative z-10">Continue</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        )}

        {/* Success Popup for Partners */}
        {showPartnerSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowPartnerSuccessPopup(false)}
            />
            
            {/* Modal Content */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-[60px] w-full max-w-[500px] relative z-10 animate-in zoom-in-95 duration-300 border border-gray-200 shadow-2xl text-center">
              {/* Close Button */}
              <button
                onClick={() => setShowPartnerSuccessPopup(false)}
                className="absolute top-4 right-4 text-[#6b6b6b] hover:text-[#2ecc71] transition-colors p-2"
                aria-label="Close success message"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Success Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-[#2ecc71]/10 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              
              {/* Success Message */}
              <h2 className="font-serif text-[#6e4d2e] text-2xl lg:text-3xl tracking-[-0.5px] leading-[1.2] font-medium mb-4">
                Partnership Request Received!
              </h2>
              
              <p className="font-sans font-normal text-[#6b6b6b] text-base lg:text-lg tracking-[-0.3px] leading-[1.4] mb-8">
                Thank you for your interest in partnering with Clarke! Our team will review your request and get back to you within 2-3 business days.
              </p>
              
              <button
                onClick={() => setShowPartnerSuccessPopup(false)}
                className="relative overflow-hidden rounded-2xl px-8 lg:px-12 py-4 lg:py-5 font-sans font-medium text-[#6b6b6b] text-sm lg:text-[16px] tracking-[-0.3px] leading-[1.3] bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group"
              >
                <span className="relative z-10">Continue</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        )}
        
      </div>
    </>
  )
}