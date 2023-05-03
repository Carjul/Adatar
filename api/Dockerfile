FROM node:18.11

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001 DB_USER=admin DB_PASSWORD=12345 DB_HOST=172.17.0.1 DB=adatar

EXPOSE 3001

VOLUME [ "/usr/src/app" ]

CMD [ "npm","run","dev" ]
