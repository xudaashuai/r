FROM node:16 as builder

COPY package.json ./

RUN yarn
COPY ./server ./server

CMD ["node", "./server/index.js"]

