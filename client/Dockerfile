FROM node:14.17.0-alpine3.13

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

VOLUME [ "/app" ]

CMD [ "npm", "run", "dev" ]