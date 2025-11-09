FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 5173
ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev"]