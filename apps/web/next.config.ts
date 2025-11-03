import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Docker 빌드 시에만 standalone 모드 활성화 (Windows 개발 환경에서는 symlink 권한 문제로 비활성화)
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),
};

export default nextConfig;
