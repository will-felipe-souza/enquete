import type { NextConfig } from "next"
/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin")
/* eslint-enable @typescript-eslint/no-require-imports */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["utfs.io"],
  },
  serverExternalPackages: ["@prisma/client"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
}

export default nextConfig
