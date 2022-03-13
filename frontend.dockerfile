FROM node:16 as builder

WORKDIR /app

COPY ./package.json ./package.json


RUN yarn

COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./vite.config.ts ./vite.config.ts
COPY ./index.html ./index.html
COPY ./src ./src
COPY ./models ./models


RUN yarn build

FROM nginx:1.17-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html