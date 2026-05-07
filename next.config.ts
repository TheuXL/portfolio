import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/posts/deteccao-dedos.html",
        destination: "/blog/deteccao-dedos",
        permanent: true,
      },
      {
        source: "/blog/posts/desenho-gestos.html",
        destination: "/blog/desenho-gestos",
        permanent: true,
      },
      {
        source: "/blog/index.html",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
