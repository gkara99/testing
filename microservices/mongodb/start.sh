#!/bin/bash

echo -n "MongoDB is a document database management system. A new container instance that is running mongodb on port 27017 will be created. The container will have "
echo -n "\"iot_project_mongodb\" as hostname which means that other containers in the same docker network can make connections to the database using that hostname. "
echo "Binding port 27017 of the container to port 27017 of the host will make the database accessible to nodes outside the docker network."

echo -e "\nDo you want to bind port 27017 of the container to port 27017 of the host?(y/n): "
read answer

if [ $answer == 'y' ]
then
    docker run -dp 27017:27017 --network iot_project --network-alias iot_project_mongodb mongo:4.4
else
    docker run -d --network iot_project --network-alias iot_project_mongodb mongo:4.4
fi