FROM node:18-alpine AS build

WORKDIR /usr/local/home

COPY ./ /usr/local/home
COPY ./src ./dist

RUN npm config set strict-ssl false
RUN npm i
RUN npm run build

FROM caddy:alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /usr/local/home/dist /srv

EXPOSE 3000
