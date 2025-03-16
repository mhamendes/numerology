import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // resolve not found .next/worker.js issue
    config.externals.push({
      'thread-stream': 'commonjs thread-stream',
      pino: 'commonjs pino',
    });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
