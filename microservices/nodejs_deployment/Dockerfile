
FROM node:18-alpine

WORKDIR /app

COPY ["microservices/nodejs_deployment/package.json", "./"]

RUN npm install

WORKDIR /app/src

COPY ["microservices/nodejs_deployment/src", "./"]

RUN addgroup -S iotProjectGroup

RUN adduser -S iotProjectUser -G iotProjectGroup

USER iotProjectUser

CMD ["node", "."]
