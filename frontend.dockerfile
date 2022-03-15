FROM node:16 as builder

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock


RUN yarn install --immutable

COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./vite.config.ts ./vite.config.ts
COPY ./index.html ./index.html
COPY ./src ./src
COPY ./common ./common
COPY ./.nvmrc ./.nvmrc
COPY ./.yarnrc ./.yarnrc

RUN yarn build

FROM nginx:latest
COPY --from=builder /app/dist/ /usr/share/nginx/html
