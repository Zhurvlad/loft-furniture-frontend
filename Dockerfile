FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR usr/src/app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:20-alpine AS builder
WORKDIR usr/src/app
COPY --from=deps usr/src/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR usr/src/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs usr/src/app/.next ./.next
COPY --from=builder usr/src/app/node_modules ./node_modules
COPY --from=builder usr/src/app/package.json ./package.json

USER nextjs

EXPOSE 3003

ENV PORT 3003

CMD ["npm", "start"]
