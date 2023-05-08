FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME [ "/usr/src/app" ]

EXPOSE 3001

CMD [ "npm", "run", "dev" ]