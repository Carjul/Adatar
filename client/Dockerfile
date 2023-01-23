FROM node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

COPY default.conf /etc/nginx/conf.d/
COPY /usr/src/app/dist /usr/share/nginx/html
