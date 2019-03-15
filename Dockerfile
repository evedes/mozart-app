FROM node:10 as mozartfrontend
WORKDIR /usr/src/mozartfrontend
COPY ./mozartfrontend/package*.json ./
RUN npm ci
COPY ./mozartfrontend ./
RUN npm run build

FROM nginx:1.14
COPY --from=mozartfrontend /usr/src/mozartfrontend/build/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
