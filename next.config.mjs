/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true
  env: {
    TELGRAM_BOT_LINK: process.env.NEXT_PUBLIC_TELGRAM_BOT_LINK
  },
};

export default nextConfig;
