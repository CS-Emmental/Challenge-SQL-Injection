FROM node:alpine

COPY package*.json ./

RUN apk update && apk upgrade && apk add sqlite

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . .

EXPOSE 8080
CMD ["node", "server.js"]