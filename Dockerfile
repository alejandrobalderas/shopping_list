FROM node:15-alpine3.10 AS builder

WORKDIR /app

COPY client/package.json .
RUN npm install
COPY client/ .
RUN npm run build

FROM node:15-alpine3.10 AS app
WORKDIR /app
COPY package.json .
RUN npm install

COPY . . 
COPY --from=builder /app/build/ ./client/build

CMD [ "npm", "start" ]