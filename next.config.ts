import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost:3000/api/media/file/**")],
  },
};

export default withPayload(nextConfig);
