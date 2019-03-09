FROM node:10-alpine as buildbackend
WORKDIR /backend
COPY ./src/package*.json ./
RUN npm ci --only=production

FROM node:10-alpine
WORKDIR /app
COPY --from=buildbackend /backend/node_modules/ ./
COPY ./src .
EXPOSE 3001

CMD ["npm", "start"]
