#!/bin/bash

echo "Python is an interpreted, high level programming language. A new container instance for creating python programs will be created."

if ! [ $(docker image ls | grep iot_project_python_development | cut -d ' ' -f 1) ]
then
    docker build -f microservices/python_development/Dockerfile -t iot_project_python_development .
fi

echo -e "\nEnter the absolute path of the project directory you want to mount on the container: "
read path

docker run -d --mount type=bind,src="$path",target="/app/src" --network iot_project iot_project_python_development