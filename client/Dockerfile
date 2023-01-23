FROM node:14-alpine
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

COPY default.conf /etc/nginx/conf.d/
COPY build /usr/share/nginx/html
