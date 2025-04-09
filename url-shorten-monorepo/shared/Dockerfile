FROM node:22
WORKDIR /app/shared
COPY . .
RUN npm i
RUN npm run build
RUN npm pack