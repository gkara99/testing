
FROM node:18-alpine

WORKDIR /app

COPY ["deployment_scenarios/imu_testing/nodejs/package.json", "./"]

RUN npm install

WORKDIR /app/src

COPY ["deployment_scenarios/imu_testing/nodejs/src", "./"]

RUN addgroup -S iotProjectGroup

RUN adduser -S iotProjectUser -G iotProjectGroup

USER iotProjectUser

CMD ["node", "."]
