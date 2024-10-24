FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

RUN corepack enable
RUN yarn set version berry
RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/.yarnrc.yml .

RUN corepack enable
RUN yarn set version berry

ENTRYPOINT ["yarn", "start:prod"]
