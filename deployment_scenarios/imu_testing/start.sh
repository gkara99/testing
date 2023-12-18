#!/bin/bash

if [ $(docker ps | grep mongo | cut -d ' ' -f 1) ]
then
    echo "There is already a MongoDB container instance running"
elif [ $(docker ps -a | grep mongo | cut -d ' ' -f 1) ]
then
    echo "There is a stopped MongoDB container instance. Do you want to start it?(y/n): "
    read answer

    if [ $answer == 'y' ]
    then
        docker container start $(docker ps -a | grep mongo | cut -d ' ' -f 1)
    else
        echo "A new MongoDB container instance will be created"
        docker run -d --network iot_project --network-alias iot_project_mongodb mongo:4.4
    fi
else
    docker run -d --network iot_project --network-alias iot_project_mongodb mongo:4.4
fi

sleep 1

if ! [ $(docker image ls | grep iot_project_imu_testing_nodejs | cut -d ' ' -f 1) ]
then
    docker build -f deployment_scenarios/imu_testing/nodejs/Dockerfile -t iot_project_imu_testing_nodejs .
fi

docker run -dp 8081:8081 --network iot_project --network-alias iot_project_api iot_project_imu_testing_nodejs


if ! [ $(docker image ls | grep iot_project_imu_testing_nginx | cut -d ' ' -f 1) ]
then
    docker build -f deployment_scenarios/imu_testing/nginx/Dockerfile -t iot_project_imu_testing_nginx .
fi

docker run -dp 8080:80 --network iot_project iot_project_imu_testing_nginx


if ! [ $(docker image ls | grep iot_project_imu_testing_python | cut -d ' ' -f 1) ]
then
    docker build -f deployment_scenarios/imu_testing/python/Dockerfile -t iot_project_imu_testing_python .
fi

docker run -d --network iot_project iot_project_imu_testing_python