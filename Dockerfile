FROM node:18.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install serve

COPY . .

RUN npm run build

EXPOSE 443

CMD ["npx", "serve", "--single", "-p", "443", "dist/spa"]
  