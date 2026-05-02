FROM node:22.22.2-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:22.22.2-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://postgres:postgres@POSTGRES:5432/faq"
ENV REDIS_URL="redis://admin:postgres@REDIS:6379/0"
ENV ADMIN_PASSWORD="6eWpXM2p9t"
ENV ADMIN_NAME="AlphaControlChuvsu"
ENV ADMIN_SECRET="6eWpXM2p9t"
ENV NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY="BSPD3ZRXU985"
ENV NEXT_PUBLIC_TYPESENSE_HOST="typesense"
ENV NEXT_PUBLIC_TYPESENSE_PORT="8108"
ENV NEXT_PUBLIC_TYPESENSE_PROTOCOL="http"
ENV NODE_EXTRA_CA_CERTS="/usr/local/rootCA.pem"
RUN npm run build

FROM node:22.22.2-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://postgres:postgres@POSTGRES:5432/faq"
ENV REDIS_URL="redis://admin:postgres@REDIS:6379/0"
ENV ADMIN_PASSWORD="6eWpXM2p9t"
ENV ADMIN_NAME="AlphaControlChuvsu"
ENV ADMIN_SECRET="6eWpXM2p9t"
ENV NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY="BSPD3ZRXU985"
ENV NEXT_PUBLIC_TYPESENSE_HOST="typesense"
ENV NEXT_PUBLIC_TYPESENSE_PORT="8108"
ENV NEXT_PUBLIC_TYPESENSE_PROTOCOL="http"
ENV NODE_EXTRA_CA_CERTS="/usr/local/rootCA.pem"
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY rootCA.pem /usr/local/rootCA.pem
RUN mkdir -p /app/.next/cache/images
CMD ["node", "server.js"]