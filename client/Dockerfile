# build client
FROM node:14 AS build

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

ENV DEVELOPMENT_SERVER_URL="https://glorious-journey-44q4rj6549w2qvpq-5000.app.github.dev/api"
ENV PRODUCTION_SERVER_URL="https://priut-29ra.onrender.com/api"

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]