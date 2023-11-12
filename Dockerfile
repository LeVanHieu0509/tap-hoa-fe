FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY next.config.js ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
