FROM node:latest

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .
CMD ["node", "--inspect=0.0.0.0:9229", "server.js"]