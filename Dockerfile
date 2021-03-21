FROM node:15-alpine3.10

WORKDIR /app
COPY package.json .
RUN npm install

COPY client/package.json client/
RUN cd client && npm install 

COPY . . 
RUN cd client && npm run build

CMD [ "npm", "start" ]