FROM node:10 as mozarthome
WORKDIR /usr/src/mozarthome
COPY ./mozarthome/package.json ./
COPY ./mozarthome/yarn.lock ./
RUN yarn
COPY ./mozarthome ./
RUN yarn build

FROM nginx:1.14
COPY --from=mozarthome /usr/src/mozarthome/build/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
