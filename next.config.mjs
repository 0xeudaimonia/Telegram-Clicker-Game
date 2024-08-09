/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true
  images: {
    unoptimized: true
  },
  env: {
    TELGRAM_BOT_LINK: process.env.NEXT_PUBLIC_TELGRAM_BOT_LINK,
    TELEGRAM_SHARE_LINK: process.env.NEXT_PUBLIC_TELEGRAM_SHARE_LINK
  },
};

export default nextConfig;
