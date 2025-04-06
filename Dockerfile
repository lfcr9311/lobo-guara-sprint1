FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn prisma generate

EXPOSE 3000