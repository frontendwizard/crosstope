# Install dependencies only when needed
FROM node:16-alpine AS builder
RUN apk update && apk upgrade
RUN apk add --no-cache libc6-compat sqlite
RUN sqlite3 /mnt/database/production.sqlite

# Install pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install --global pnpm

ENV DATABASE_URL "file:/mnt/database/production.sqlite"
ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts --prod
COPY . .
RUN pnpx prisma generate
RUN pnpm run build
RUN pnpm run generate-sqlite
RUN pnpm run migrate

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
