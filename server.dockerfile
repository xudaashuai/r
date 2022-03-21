FROM node:16 as builder

COPY package.json ./

RUN yarn
COPY ./server ./server
COPY ./common ./common
COPY ./tsconfig.json ./tsconfig.json

CMD ["yarn", "serve"]

