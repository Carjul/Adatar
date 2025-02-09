FROM node:20.11.1

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3001

VOLUME [ "/usr/src/api" ]

CMD [ "npm","start" ]
