FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

VOLUME [ "/app" ]

CMD [ "npm", "run", "dev" ]