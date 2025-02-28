/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    images: {
      domains: ['cdn.example.com'], // Domínios permitidos para imagens dinâmicas
    },
  };
  
  module.exports = nextConfig;
  