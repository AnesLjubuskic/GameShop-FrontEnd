#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
#stage 2
FROM nginx:latest
COPY --from=node /app/dist/game-shop /usr/share/nginx/html