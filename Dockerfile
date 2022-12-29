FROM node:18-alpine3.16

WORKDIR /app
COPY ./ ./

RUN apk add --update --no-cache yarn && \
  yarn install --network-concurrency 1

USER node