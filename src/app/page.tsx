'use client'

import { useState, useEffect } from 'react'
//import { supabase } from '@/lib/supabase'
import { addPartner } from '@/lib/supabase-utils'
import Script from 'next/script'
//import SupabaseStatus from '@/components/SupabaseStatus'
import Logo from '@/components/Logo'
import { Input } from '@/components/ui/input'
import LottieAnimation from '@/components/LottieAnimation'

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
  const [brandName, setBrandName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

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
            "background": "#000000",
            "particles": [
              "#1a1a1a",
              "#0a0a0a",
              "#262626",
              "#333333"
            ]
          },
          "blending": "overlay",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // Add to Supabase brand_name table
      await addPartner({ brand_name: brandName, email })

      setBrandName('')
      setEmail('')
      setShowForm(false)
      setShowSuccessPopup(true)
    } catch (error) {
      console.error('Error:', error)
      // Provide more specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('duplicate key')) {
        setMessage('This email has already been submitted.')
      } else if (errorMessage.includes('violates row-level security')) {
        setMessage('Permission denied. Please check your Supabase configuration.')
      } else if (errorMessage) {
        setMessage(`Error: ${errorMessage}`)
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Partner form handler (reserved for future use)
  // const handlePartnerSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsPartnerSubmitting(true)
  //   setPartnerMessage('')
  //
  //   try {
  //     // Add to Supabase partners
  //     await addPartner({ brand_name: brandName, email: brandEmail })
  //     
  //     // Send notification email
  //     try {
  //       const emailResponse = await fetch('/api/send-waitlist-email', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ name: brandName, email: brandEmail, type: 'partner' }),
  //       })
  //
  //       if (!emailResponse.ok) {
  //         console.error('Failed to send partner notification email')
  //         // Don't throw error here - the partner is still added to database
  //       }
  //     } catch (emailError) {
  //       console.error('Partner email sending error:', emailError)
  //       // Continue with success flow even if email fails
  //     }
  //
  //     setBrandName('')
  //     setBrandEmail('')
  //     setShowPartnerForm(false)
  //     setShowPartnerSuccessPopup(true)
  //   } catch (error) {
  //     setPartnerMessage('Something went wrong. Please try again.')
  //     console.error('Error:', error)
  //   } finally {
  //     setIsPartnerSubmitting(false)
  //   }
  // }

  return (
    <>
      <Script src="/finisher-header.es5.min.js" strategy="afterInteractive" />

      <div className="relative min-h-screen overflow-x-hidden bg-black text-white w-full">
        {/* Finisher Header Background */}
        <div className="header finisher-header" style={{ width: '100vw', height: '100%', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }} />
        
        <SkipLink />
        
        {/* Header Navigation */}
        <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-20 pt-4 sm:pt-6 md:pt-8 lg:pt-[47px]">
          {/* Logo */}
          <div className="h-[48px] w-[80px] sm:h-[48px] sm:w-[80px] md:h-[56px] md:w-[100px] relative">
            <Logo useNextImage={true} />
          </div>
          
          {/* Navigation Right Side */}
          <nav className="flex gap-2 sm:gap-4 md:gap-[29px] items-center relative">
            {/* Email Button */}
            <a
              href="mailto:sam@useclarke.app"
              className="relative overflow-hidden rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-sans font-normal text-white text-sm sm:text-base lg:text-sm tracking-[-0.3px] sm:tracking-[-0.4px] leading-[1.3] bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black group hover:bg-white/20"
              aria-label="Send email to sam@useclarke.app"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </a>
          </nav>
        </header>

        <main id="main-content" className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
          {/* Features Section */}
          {/*<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-[40px] mt-16 lg:mt-[80px] pb-20">
            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3 className="font-sans font-medium text-white text-regular text-base sm:text-lg tracking-[-0.3px] leading-[1.5]">
                Built for fashion brands.
              </h3>
              <p className="font-sans font-normal text-gray-200 text-xs sm:text-sm lg:text-sm tracking-[-0.5px] leading-[1.5]">
                Built with Shopify standards, Clarke is built to integrate with your existing Shopify store.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3  className="font-sans font-medium text-white text-regular text-base sm:text-lg tracking-[-0.3px] leading-[1.5]">
                A shopping assistant that understands your customers
              </h3>
              <p className="font-sans font-normal text-gray-200 text-xs sm:text-sm lg:text-sm tracking-[-0.5px] leading-[1.5]">
              Clarke combines your product data with each shopper's body context in real-time conversations.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
              <h3 className="font-sans font-medium text-white text-regular text-base sm:text-lg tracking-[-0.3px] leading-[1.5]">
                Your shoppers get a personal fit expert. You get fewer returns.
              </h3>
              <p className="font-sans font-normal text-gray-200 text-sm lg:text-sm leading-[1.5]">
               Clarke answers "Will this fit me?" in real-time by understanding each shopper's body and your brand's sizing
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">
                <h3 className="font-sans font-medium text-white text-regular text-base sm:text-lg tracking-[-0.3px] leading-[1.5]">
              Reduce Size-Based Returns
              </h3>
              <p className="font-sans font-normal text-gray-200 text-xs sm:text-sm lg:text-sm leading-[1.5]">
                Reduce fit-related returns by helping shoppers get it right the first time.
              </p>
            </div>
          </div>
          */}

        </main>

        {/* Form Overlay - Conditionally Rendered */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            
            {/* Modal Content */}
            <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-[60px] w-full max-w-[600px] relative z-10 animate-in zoom-in-95 duration-300 border border-white/40 shadow-2xl mx-4 sm:mx-0">
              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white hover:text-[#2ecc71] transition-colors p-2"
                aria-label="Close form"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                {/* Form Header */}
                <div className="text-left">
                  <h2 className="font-serif text-white text-xl sm:text-2xl lg:text-3xl tracking-[-0.4px] sm:tracking-[-0.5px] leading-[1.2] font-medium">
                    Request Demo
                  </h2>
                </div>
                
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <Input
                      id="brandName"
                      type="text"
                      placeholder="What is your Brand Name?"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="bg-white/90 backdrop-blur-sm border-white/50 focus-visible:border-[#2ecc71] focus-visible:bg-white text-gray-900 placeholder:text-gray-500 font-sans text-sm sm:text-base tracking-[-0.2px] py-2.5 sm:py-3 px-3 sm:px-4 shadow-sm"
                      required
                      aria-describedby="brandName-error"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/90 backdrop-blur-sm border-white/50 focus-visible:border-[#2ecc71] focus-visible:bg-white text-gray-900 placeholder:text-gray-500 font-sans text-sm sm:text-base tracking-[-0.2px] py-2.5 sm:py-3 px-3 sm:px-4 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 font-sans font-medium text-white text-xs sm:text-sm lg:text-base tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.3] bg-[#DBA7FC] backdrop-blur-sm border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group hover:bg-white/40"
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

        {/* Bottom Left Section - Hero Content */}
        <div className="fixed bottom-8 left-0 z-20 px-4 sm:px-6 md:px-8 lg:px-20 pt-40 pb-4 sm:pb-6 md:pb-8 lg:pb-12 w-full sm:w-auto lg:max-w-[50%]">
          <div className="flex flex-col items-start text-left">
            {/* Mobile Animation - Above Badge */}
            <div className="w-48 sm:w-56 md:w-64 h-56 sm:h-56 md:h-56 mb-20 sm:mb-40 md:mb-52 lg:hidden">
              <LottieAnimation className="w-full h-full" />
            </div>

            {/* Badge */}
            <div className="glass-effect-subtle flex items-center justify-center px-2.5 sm:px-3 py-1.5 sm:py-2 w-fit rounded-lg mb-4 sm:mb-6">
              <span className="font-sans font-medium text-xs sm:text-sm-custom tracking-[0.5px] sm:tracking-[1px] leading-[1.2] text-gray-300">
               BUILT FOR SHOPIFY STORES
              </span>
            </div>

            {/* Hero Heading */}
            <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-display tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-2.5px] leading-[1.1] font-medium mb-1 sm:mb-2">
              Stop Losing Sales to Sizing Questions
              <br />
              <span className="block mt-1 italic">Clarke Answers Instantly, 24/7</span>
            </h1>


            {/* Subtitle */}
            <p className="font-sans font-normal text-gray-200 text-base sm:text-base md:text-lg lg:text-xl tracking-[-0.4px] sm:tracking-[-0.5px] lg:tracking-[-0.6px] leading-[1.35] mb-4 sm:mb-6 max-w-[600px]">
              Clarke lives on your site as a shopping assistant, guiding sizing decisions while shoppers browse. Reducing bracketing and size-based returns.
            </p>

            {/* Request Demo - CTA */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 font-sans font-medium text-[#572F76] text-xs sm:text-sm lg:text-base tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.3] bg-[#DBA7FC] backdrop-blur-sm border border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black group hover:bg-white/20"
            >
              <span className="relative z-10">{showForm ? 'Hide Form' : 'Request Demo'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
          </div>
        </div>

        {/* Desktop Animation - Right Side */}
        <div className="hidden lg:block fixed bottom-8 right-0 z-20 px-20 pb-12 w-auto max-w-[45%]">
          <div className="w-[500px] h-[500px] xl:w-[600px] xl:h-[600px]">
            <LottieAnimation className="w-full h-full" />
          </div>
        </div>

        {/* Success Popup for Waitlist */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowSuccessPopup(false)}
            />
            
            {/* Modal Content */}
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 lg:p-[60px] w-full max-w-[500px] relative z-10 animate-in zoom-in-95 duration-300 border border-white/40 shadow-2xl text-center">
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-white hover:text-[#2ecc71] transition-colors p-2"
                aria-label="Close success message"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Success Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-[#2ecc71]/20 rounded-full flex items-center justify-center">
                <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              
              {/* Success Message */}
              <h2 className="font-serif text-white text-xl sm:text-2xl lg:text-3xl tracking-[-0.4px] sm:tracking-[-0.5px] leading-[1.2] font-medium mb-3 sm:mb-4">
                Welcome to Clarke!
              </h2>
              
              <p className="font-sans font-normal text-gray-200 text-sm sm:text-base lg:text-lg tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.4] mb-6 sm:mb-8">
                Thank you for your interest in Clarke! A representative will be in touch shortly to discuss your partnership.
              </p>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 font-sans font-medium text-white text-xs sm:text-sm lg:text-base tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.3] bg-white/30 backdrop-blur-sm border border-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group hover:bg-white/40"
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
            <div className="bg-white/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-[60px] w-full max-w-[500px] relative z-10 animate-in zoom-in-95 duration-300 border border-white/40 shadow-2xl text-center mx-4 sm:mx-0">
              {/* Close Button */}
              <button
                onClick={() => setShowPartnerSuccessPopup(false)}
                className="absolute top-4 right-4 text-white hover:text-[#2ecc71] transition-colors p-2"
                aria-label="Close success message"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Success Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-[#2ecc71]/20 rounded-full flex items-center justify-center">
                <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              
              {/* Success Message */}
              <h2 className="font-serif text-white text-xl sm:text-2xl lg:text-3xl tracking-[-0.4px] sm:tracking-[-0.5px] leading-[1.2] font-medium mb-3 sm:mb-4">
                Partnership Request Received!
              </h2>
              
              <p className="font-sans font-normal text-gray-200 text-sm sm:text-base lg:text-lg tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.4] mb-6 sm:mb-8">
                Thank you for your interest in partnering with Clarke! Our team will review your request and get back to you within 2-3 business days.
              </p>
              
              <button
                onClick={() => setShowPartnerSuccessPopup(false)}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 font-sans font-medium text-white text-xs sm:text-sm lg:text-base tracking-[-0.2px] sm:tracking-[-0.3px] leading-[1.3] bg-white/30 backdrop-blur-sm border border-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2 group hover:bg-white/40"
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