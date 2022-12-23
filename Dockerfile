FROM node:18-alpine3.16

WORKDIR /app
COPY ./ ./

RUN apk add --update --no-cache yarn && \
  yarn install --networl-concurrency

USER node