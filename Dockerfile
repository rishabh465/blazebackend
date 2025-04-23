FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"] 