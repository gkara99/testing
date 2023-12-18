import requests
import time
import json

print("Converting IMU data to vehicle data")

steering = 0
steeringDirection = "center"

res = requests.get("http://iot_project_api:8081/read?description=IMU")
roll = json.loads(res.text)["roll"]
pitch = json.loads(res.text)["pitch"]
yaw = json.loads(res.text)["yaw"]

while True:

    res = requests.get("http://iot_project_api:8081/read?description=IMU")
    newRoll = json.loads(res.text)["roll"]
    newPitch = json.loads(res.text)["pitch"]
    newYaw = json.loads(res.text)["yaw"]

    if roll == newRoll and pitch == newPitch and yaw == newYaw:
        time.sleep(0.1)
        continue
    else:
        roll = newRoll
        pitch = newPitch
        yaw = newYaw
    


    if roll <= 100 and roll >= 80:
        steering = 0
        steeringDirection = "center"
    elif roll > 100:
        steering = (roll - 100) / 80 * 100
        steeringDirection = "left"
    elif roll < 80 and roll >= 0:
        steering = 100 - (roll / 80 * 100)
        steeringDirection = "right"

    if steering > 100:
        steering = 100


    if pitch <= 10 and pitch >= -10:
        throttle = 0
        vehicleDirection = "none"
    elif pitch < 10:
        throttle = ((pitch * -1) - 10) / 80 * 100
        vehicleDirection = "forwards"
    else:
        throttle = (pitch - 10) / 80 * 100
        vehicleDirection = "backwards"

    if throttle > 100:
        throttle = 100


    frontLeft = frontRight = rearLeft = rearRight = throttle
    steeringRate = (1 - steering / 100 * 0.3)

    if steeringDirection == "left":
        frontLeft = frontLeft * steeringRate
        rearLeft = rearLeft * steeringRate
    elif steeringDirection == "right":
        frontRight = frontRight * steeringRate
        rearRight = rearRight * steeringRate
    

    res = requests.get("http://iot_project_api:8081/write?description=controlledVehicleData&throttle=" + str(throttle) +"&vehicleDirection=" + str(vehicleDirection) + 
    "&steering=" + str(steering) + "&steeringDirection=" + str(steeringDirection) + "&frontLeft=" + str(frontLeft) + "&frontRight=" + str(frontRight) + "&rearLeft=" +
    str(rearLeft) + "&rearRight=" + str(rearRight))
    

    time.sleep(0.1)
