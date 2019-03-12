FROM node:10-alpine as api
WORKDIR /api
COPY ./src/package*.json ./
RUN npm ci --only=production

FROM node:10-alpine
WORKDIR /api
COPY --from=api /api/node_modules/ ./node_modules/
COPY ./src .
EXPOSE 3001

CMD ["npm", "start"]
