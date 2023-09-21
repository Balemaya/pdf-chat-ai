/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true, };
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
      })
      config.plugins.push(
      new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
      })
      )
      
      return config;
  },
};

export default nextConfig;
