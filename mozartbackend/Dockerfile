FROM node:10-alpine as api
WORKDIR /api
COPY ./sourcecode/package*.json ./
RUN npm ci --only=production

FROM node:10-alpine
RUN apk add --no-cache curl
WORKDIR /api
COPY --from=api /api/node_modules/ ./node_modules/
COPY ./sourcecode .
EXPOSE 3001

CMD ["npm", "start"]
