# 1. 빌드 스테이지
FROM node:22-alpine AS build
WORKDIR /usr/src/app

# pnpm 설치
RUN npm install -g pnpm@10.18.3

# 2. 루트의 pnpm 설정 파일들 복사
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
# 3. 모든 의존성 설치
RUN pnpm install --frozen-lockfile --prod=false

# 4. 소스코드 복사
COPY tsconfig.base.json ./
COPY packages ./packages
COPY apps/web ./apps/web

# 4.5. 소스코드 복사 후 다시 설치 (심볼릭 링크 복구)
RUN pnpm install --frozen-lockfile --prod=false

# 5. 공유 패키지들 먼저 빌드
WORKDIR /usr/src/app
RUN pnpm --filter @repo/types run build
RUN pnpm --filter @repo/validation run build

# 6. web 앱 빌드
RUN pnpm --filter @app/web run build

# 6. 프로덕션 스테이지
FROM node:22-alpine AS final
WORKDIR /usr/src/app

# 7. 빌드 스테이지에서 생성된 'standalone' 폴더 복사
COPY --from=build /usr/src/app/apps/web/.next/standalone ./standalone

# 8. 'public' 폴더와 '.next/static' 폴더 복사 (standalone 구조에 맞게)
COPY --from=build /usr/src/app/apps/web/public ./standalone/apps/web/public
COPY --from=build /usr/src/app/apps/web/.next/static ./standalone/apps/web/.next/static

EXPOSE 3000
CMD ["node", "standalone/apps/web/server.js"]