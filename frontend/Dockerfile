FROM node:18-alpine as build

WORKDIR /usr/local/home

COPY ./ /usr/local/home
COPY ./src ./dist

RUN npm config set strict-ssl false
RUN npm i
RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/home/dist /usr/share/nginx/html

EXPOSE 80
