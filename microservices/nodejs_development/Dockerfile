
FROM node:18-alpine

WORKDIR /app

COPY ["microservices/nodejs_development/package.json", "./"]

RUN npm install

WORKDIR /app/src

RUN addgroup -S iotProjectGroup

RUN adduser -S iotProjectUser -G iotProjectGroup

USER iotProjectUser

CMD ["tail", "-f", "/dev/null"]
