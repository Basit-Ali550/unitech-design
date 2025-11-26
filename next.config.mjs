/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  
  // Optimize for serverless deployment (Vercel's default)
  output: 'standalone', // or 'export' if you're doing static site
  
  // Handle image domains if using external images
  images: {
    domains: [], // Add your image domains here
    unoptimized: false, // Set to true if using static export
  },
  
  // Enable SWC minification (better performance)
  swcMinify: true,
  
  // Handle redirects if needed
  async redirects() {
    return [];
  },
  
  // Custom headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;