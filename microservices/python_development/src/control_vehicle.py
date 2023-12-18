import requests
import json
import os


res = requests.get("http://iot_project_api:8081/read")
sensor1 = json.loads(res.text)["sensor1"]
sensor2 = json.loads(res.text)["sensor2"]
mode = json.loads(res.text)["mode"]

while True:
    os.system("clear")
    print("Control the vehicle")
    print("wasd for movement, j to stop, k to move forwards, l to move backwards")
    key = input()

    if key == 'w':
        sensor1 = 1
        sensor2 = 1
    
    elif key == 'a':
        sensor1 = 1
        sensor2 = 0
    
    elif key == 's':
        sensor1 = 0
        sensor2 = 0

    elif key == 'd':
        sensor1 = 0
        sensor2 = 1
    
    elif key == 'j':
        mode = 0

    elif key == 'k':
        mode = 1
    
    elif key == 'l':
        mode = 2

    res = requests.get("http://iot_project_api:8081/write?sensor1=" + str(sensor1) + "&sensor2=" + str(sensor2) + "&mode=" + str(mode))
    