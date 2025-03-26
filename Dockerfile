FROM node:latest
WORKDIR /app
COPY ./backend/package.json /app
RUN npm install
COPY ./backend /app
CMD ["npm", "start"]
