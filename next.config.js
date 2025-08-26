/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export mode - generates static HTML files
  // Note: This disables server-side features like Image Optimization API
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    // Required for static export - disables Next.js Image Optimization API
    // Images will be served as-is without automatic optimization
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig