FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_PUBLIC_API=https://carjul-opulent-chainsaw-gwr4j465q7x3vppg-3004.preview.app.github.dev VITE_PUBLIC_DOMAIN="dev-35dy5wz22m0uql2f.us.auth0.com" VITE_PUBLIC_CLIENT_ID="DZkkkzyucPxIKzlNoH3ru3Al0NL8OzL1" 

EXPOSE 3000

VOLUME [ "/usr/src/app" ]

CMD [ "npm", "run", "dev" ]