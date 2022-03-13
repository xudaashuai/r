FROM node:16 as builder

COPY package.json ./

RUN yarn config set registry http://mirrors.cloud.tencent.com/npm/
RUN yarn
COPY ./server ./server

CMD ["yarn", "serve"]

