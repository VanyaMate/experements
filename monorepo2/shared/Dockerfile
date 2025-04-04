FROM node:22
WORKDIR /app/shared
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build