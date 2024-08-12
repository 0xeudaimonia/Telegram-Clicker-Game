/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true
  images: {
    unoptimized: true
  },
  env: {
    TELGRAM_BOT_LINK: process.env.NEXT_PUBLIC_TELGRAM_BOT_LINK,
    TELEGRAM_SHARE_LINK: process.env.NEXT_PUBLIC_TELEGRAM_SHARE_LINK,
    TELEGRAM_BOT_API_LINK: process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_LINK,
    TELEGRAM_BOT_TOKEN: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  },
};

export default nextConfig;
