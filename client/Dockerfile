FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_PUBLIC_API=http://localhost:3004 VITE_PUBLIC_CLIENT_ID="DZkkkzyucPxIKzlNoH3ru3Al0NL8OzL1" VITE_PUBLIC_DOMAIN="dev-35dy5wz22m0uql2f.us.auth0.com"
EXPOSE 3001

VOLUME [ "/usr/src/app" ]

CMD [ "npm", "start" ]