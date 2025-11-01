# 1. 베이스 이미지 (로그의 22버전 기준)
FROM node:22-alpine AS base
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
COPY apps/api ./apps/api

# 4.5. 소스코드 복사 후 다시 설치 (심볼릭 링크 복구)
RUN pnpm install --frozen-lockfile --prod=false

# 5. 공유 패키지들 먼저 빌드
WORKDIR /usr/src/app
RUN pnpm --filter @repo/types run build
RUN pnpm --filter @repo/validation run build
RUN pnpm --filter @repo/db run prisma:generate
RUN pnpm --filter @repo/db run build

# 6. api 앱 빌드
RUN pnpm --filter @app/api run build

# 6. 배포용 이미지 생성
FROM node:22-alpine AS final
WORKDIR /usr/src/app

# 7. 전체 프로젝트 구조를 그대로 복사 (pnpm 모노레포의 경우 이 방법이 가장 안전)
COPY --from=base /usr/src/app/ ./

# 8. API 디렉토리로 이동해서 실행
WORKDIR /usr/src/app/apps/api
CMD ["node", "dist/main"]