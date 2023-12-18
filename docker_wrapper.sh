#!/bin/bash

# Creating a docker network for the project so that the containers can communicate
if ! [ $(docker network ls | grep iot_project | cut -d ' ' -f 1) ]
then
    docker network create iot_project > /dev/null
fi

selectDeploymentScenario() 
{
    echo "Welcome to the deployment scenarios menu. Here you can run a deployment scenario consisting of preset microservices."
    echo -e "\nDeployment Scenarios"
    echo "1) IMU testing. Writing imu data on a database with the use of a REST API and interpreting the data using a python program. Consisting of:"
    echo "      - 1 MongoDB microservice listening on port 27017"
    echo "      - 1 Nodejs microservice running a REST API and listening on ports(host:container) 8081:8081"
    echo "      - 1 NGINX microservice running a web application and listening on ports(host:container) 8080:80"
    echo "      - 1 Python microservice running a program for converting the imu data to vehicle data"
    echo "2) Return to main menu"
    echo "Enter your option: "
    read answer

    clear

    case $answer in

        1)
            deployment_scenarios/imu_testing/start.sh
            ;;
        
        2)
            echo ""
            ;;

        *)
            echo "Invalid option"
            ;;	
    esac
}

selectMicroservice() 
{
    echo -n "Welcome to the microservices menu. Here you can select a microservice to run in a container. Selecting a microservice for the first time will build the " 
    echo -n "equivalent image and then create a container instance based on that image. The development versions mount the selected directory to the container so that changes "
    echo -n "that are made to the files on the host/container also reflect to the container's/host's file system. The deployment versions copy the contents of the selected "
    echo -n "directory during the image building. This means that changes made to the files on the host/container will NOT reflect to the container's/host's file system. " 
    echo -n "If you made changes to the files on the host system and you want them to reflect on the container you will need to remove the image and then build it again "
    echo "by selecting the microservice."
    echo -e "\nMicroservices"
    echo "1) MongoDB"
    echo "2) Nodejs(Development)"
    echo "3) Nodejs(Deployment)"
    echo "4) NGINX(Development)"
    echo "5) NGINX(Deployment)"
    echo "6) Python(Development)"
    echo "7) Return to main menu"
    echo "Enter your option: "
    read answer

    clear

    case $answer in

        1)
            microservices/mongodb/start.sh
            ;;
        
        2)
            microservices/nodejs_development/start.sh
            ;;

        3)
            microservices/nodejs_deployment/start.sh
            ;;

        4)
            microservices/nginx_development/start.sh
            ;;
        
        5)
            microservices/nginx_deployment/start.sh
            ;;

        6)
            microservices/python_development/start.sh
            ;;

        7)
            echo ""
            ;;

        *)
            echo "Invalid option"
            ;;	
    esac
}

while :
do
    echo -e "\nOptions"
    echo "1) Run a deployment scenario consisting of preset microservices"
    echo "2) Create a container instance from one of the listed microservices"
    echo "3) List images"
    echo "4) List running containers"
    echo "5) List all containers"
    echo "6) Remove an image"
    echo "7) Initiate a Shell for a container"
    echo "8) Start a stopped container"
    echo "9) Stop a container"
    echo "10) Remove a container"
    echo "11) Print a container's logs"
    echo "12) Exit"
    echo "Enter your option: "
    read answer


    if [ $answer -eq 12 ]
    then
        break
    fi

    clear

    case $answer in

        1)
            selectDeploymentScenario
            ;;

        2)
            selectMicroservice
            ;;

        3)
            docker image ls
            ;;

        4)
            docker ps
            ;;

        5)
            docker ps -a
            ;;

        6)
            docker image ls
            echo -e "\nEnter the id of the image(s) you want to remove: "
            read answer
            docker image rm $answer
            ;;

        7)
            docker ps
            echo -e "\nEnter the id of the container: "
            read answer

            if [ $(docker ps | grep $answer | grep mongo | cut -d ' ' -f 1) ]
            then
                docker exec -it $answer /bin/bash
            else
                docker exec -it $answer /bin/sh
            fi

            ;;

        8)
            docker ps -a | grep -E "CONTAINER ID|Exited"
            echo -e "\nEnter the id of the container(s) you want to start: "
            read answer
            docker container start $answer > /dev/null
            ;;

        9)
            docker ps
            echo -e "\nEnter the id of the container(s) you want to stop: "
            read answer
            docker container stop $answer > /dev/null
            echo "Container(s) with id: $answer stopped"
            ;;

        10)
            docker ps -a
            echo -e "\nEnter the id of the container(s) you want to remove: "
            read answer
            docker container rm -fv $answer > /dev/null
            echo "Container(s) with id: $answer removed"
            ;;

        11)
            docker ps -a
            echo -e "\nEnter the id of the container: "
            read answer
            docker logs $answer
            ;;

        *)
            echo "Invalid option"
            ;;	
    esac
done

