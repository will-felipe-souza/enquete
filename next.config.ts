import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["utfs.io"],
  },
  serverExternalPackages: ["@prisma/client"],
}

export default nextConfig
