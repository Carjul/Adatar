FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001 DB_USER=postgres DB_PASSWORD=postgres DB_HOST=172.17.0.1 DB=adatar

EXPOSE 3001

VOLUME [ "/usr/src/app" ]

CMD [ "npm","run","dev" ]
