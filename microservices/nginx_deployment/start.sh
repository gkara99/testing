#!/bin/bash

if ! [ $(docker image ls | grep iot_project_nginx_deployment | cut -d ' ' -f 1) ]
then
    docker build -f microservices/nginx_deployment/Dockerfile -t iot_project_nginx_deployment .
fi

docker run -dp 8080:80 --network iot_project --name iot_project_web_server iot_project_nginx_deployment