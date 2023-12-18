#!/bin/bash

echo "NGINX is a web server and a load balancer. A new container instance for developing web applications will be created."
echo -e "\nEnter the absolute path of the project directory you want to mount on the container: "
read path

echo -e "\nEnter the port binding between the host and the container in the format host:container(for example \"8080:80\"): "
read port_binding

host_port=$(echo $port_binding | cut -d ':' -f 1)
container_port=$(echo $port_binding | cut -d ':' -f 2)

if [ $host_port -lt 0 ] || [ $host_port -gt 65535 ] || [ $container_port -lt 0 ] || [ $container_port -gt 65535 ]
then
    echo "Invalid port binding"
else
    docker run -dp $port_binding --mount type=bind,src="$path",target="/usr/share/nginx/html" --network iot_project nginx:1.25-alpine
fi