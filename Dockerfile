# Install dependencies only when needed
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat

# Install pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install --global pnpm

ENV DATABASE_URL "file:/mnt/database/production.sqlite"

# Install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts --prod
COPY . .
RUN pnpx prisma generate
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build
RUN pnpm run generate-sqlite

# Production image, copy all the files and run next
# FROM node:16-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# USER nextjs

# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

CMD ["npm", "start"]
