import requests

while True:
    print("Enter roll: ")
    roll = float(input())

    print("Enter pitch: ")
    pitch = float(input())

    print("Enter yaw: ")
    yaw = float(input())


    res = requests.get("http://iot_project_api:8081/write?description=IMU&roll=" + str(roll) + "&pitch=" + str(pitch) + "&yaw=" + str(yaw))