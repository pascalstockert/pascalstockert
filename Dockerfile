FROM node:iron as build

WORKDIR /usr/local/pasu-home

COPY ./ /usr/local/pasu-home
COPY ./src ./dist

RUN npm i
RUN npm run build:styles

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/pasu-home/dist /usr/share/nginx:w/html

EXPOSE 80
