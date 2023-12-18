#!/bin/bash

if ! [ $(docker image ls | grep iot_project_nodejs_deployment | cut -d ' ' -f 1) ]
then
    docker build -f microservices/nodejs_deployment/Dockerfile -t iot_project_nodejs_deployment .
fi

docker run -dp 8081:8081 --network iot_project --network-alias iot_project_api iot_project_nodejs_deployment