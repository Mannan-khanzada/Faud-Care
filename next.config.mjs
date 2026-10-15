/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger Node.js hosting has no image optimiser sidecar; keep images as-is.
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Admin forms can upload images (up to 5 MB) through server actions.
  experimental: {
    serverActions: { bodySizeLimit: '6mb' },
  },

  async redirects() {
    return [
      // www -> non-www (single canonical host for SEO)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fuad.care' }],
        destination: 'https://fuad.care/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Admin must never be indexed or cached
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        // Static images in /public
        source: '/:file(.*\\.(?:png|jpg|jpeg|svg|webp|ico))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

export default nextConfig
