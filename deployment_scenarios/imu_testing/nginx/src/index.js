let vehicle = document.getElementById("vehicle");
let roll = 90;
let pitch = 0;
let yaw = 0;

let throttle = 0;
let vehicleDirection = "none";
let steering = 0;
let steeringDirection = "center";
let vehicleAngle = 0;

document.getElementById("increaseRoll").addEventListener("click", function() {
    if(roll < 180)
    {
        roll = roll + 20;
        changeIMUData()
    }
});

document.getElementById("decreaseRoll").addEventListener("click", function() {
    if(roll > 0)
    {
        roll = roll - 20;
        changeIMUData()
    }
});

document.getElementById("increasePitch").addEventListener("click", function() {
    if(pitch < 90)
    {
        pitch = pitch + 20;
        changeIMUData()
    }
});

document.getElementById("decreasePitch").addEventListener("click", function() {
    if(pitch > -90)
    {
        pitch = pitch - 20;
        changeIMUData()
    }
});

function changeIMUData()
{
    let xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
    }
    xhttp.open("GET", "http://127.0.0.1:8081/write?description=IMU&roll=" + roll + "&pitch=" + pitch + "&yaw=" + yaw, true)
    xhttp.send();
}


setInterval(updateVehicleData, 100);

function updateVehicleData() 
{
    let xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        response = JSON.parse(this.responseText);
        throttle = response.throttle;
        vehicleDirection = response.vehicleDirection;
        steering = response.steering;
        steeringDirection = response.steeringDirection;
        document.getElementById("throttle").textContent = "Throttle: " + throttle;
        document.getElementById("vehicleDirection").textContent = "Vehicle Direction: " + vehicleDirection;
        document.getElementById("steering").textContent = "Steering: " + steering;
        document.getElementById("steeringDirection").textContent = "Steering Direction: " + steeringDirection;
        document.getElementById("frontLeft").textContent = "Front Left PWM: " + response.frontLeft;
        document.getElementById("frontRight").textContent = "Front Right PWM: " + response.frontRight;
        document.getElementById("rearLeft").textContent = "Rear Left PWM: " + response.rearLeft;
        document.getElementById("rearRight").textContent = "Rear Right PWM: " + response.rearRight;
    }
    xhttp.open("GET", "http://127.0.0.1:8081/read?description=controlledVehicleData", true)
    xhttp.send();
}

setInterval(updateIMUData, 100);

function updateIMUData() 
{
    let xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        response = JSON.parse(this.responseText);
        roll = response.roll;
        pitch = response.pitch;
        yaw = response.yaw;
        document.getElementById("rollValue").textContent = "roll: " + roll;
        document.getElementById("pitchValue").textContent = "pitch: " + pitch;
        document.getElementById("yawValue").textContent = "yaw: " + yaw;
        
    }
    xhttp.open("GET", "http://127.0.0.1:8081/read?description=IMU", true)
    xhttp.send();
}



let vehicle_left = 50;
let vehicle_top = 50;
let coefficient = document.body.clientWidth / document.body.clientHeight;

setInterval(calculateResolution, 1000);

function calculateResolution()
{
    coefficient = document.body.clientWidth / document.body.clientHeight;
}


setInterval(updateVehiclePosition, 1);

function updateVehiclePosition() 
{
    if((vehicleAngle >= 0 && vehicleAngle < 7.5) || (vehicleAngle <= 360 && vehicleAngle >= 352.5))
    {
        vehicle.setAttribute("src", "images/vehicle1.png");

    }
    else if(vehicleAngle >= 7.5 && vehicleAngle < 22.5)
    {
        vehicle.setAttribute("src", "images/vehicle24.png");
    }
    else if(vehicleAngle >= 22.5 && vehicleAngle < 37.5)
    {
        vehicle.setAttribute("src", "images/vehicle23.png");
    }
    else if(vehicleAngle >= 37.5 && vehicleAngle < 52.5)
    {
        vehicle.setAttribute("src", "images/vehicle22.png");
    }
    else if(vehicleAngle >= 52.5 && vehicleAngle < 67.5)
    {
        vehicle.setAttribute("src", "images/vehicle21.png");
    }
    else if(vehicleAngle >= 67.5 && vehicleAngle < 82.5)
    {
        vehicle.setAttribute("src", "images/vehicle20.png");
    }
    else if(vehicleAngle >= 82.5 && vehicleAngle < 97.5)
    {
        vehicle.setAttribute("src", "images/vehicle4.png");
    }
    else if(vehicleAngle >= 97.5 && vehicleAngle < 112.5)
    {
        vehicle.setAttribute("src", "images/vehicle14.png");
    }
    else if(vehicleAngle >= 112.5 && vehicleAngle < 127.5)
    {
        vehicle.setAttribute("src", "images/vehicle13.png");
    }
    else if(vehicleAngle >= 127.5 && vehicleAngle < 142.5)
    {
        vehicle.setAttribute("src", "images/vehicle12.png");
    }
    else if(vehicleAngle >= 142.5 && vehicleAngle < 157.5)
    {
        vehicle.setAttribute("src", "images/vehicle11.png");
    }
    else if(vehicleAngle >= 157.5 && vehicleAngle < 172.5)
    {
        vehicle.setAttribute("src", "images/vehicle10.png");
    }
    else if(vehicleAngle >= 172.5 && vehicleAngle < 187.5)
    {
        vehicle.setAttribute("src", "images/vehicle2.png");
    }
    else if(vehicleAngle >= 187.5 && vehicleAngle < 202.5)
    {
        vehicle.setAttribute("src", "images/vehicle19.png");
    }
    else if(vehicleAngle >= 202.5 && vehicleAngle < 217.5)
    {
        vehicle.setAttribute("src", "images/vehicle18.png");
    }
    else if(vehicleAngle >= 217.5 && vehicleAngle < 232.5)
    {
        vehicle.setAttribute("src", "images/vehicle17.png");
    }
    else if(vehicleAngle >= 232.5 && vehicleAngle < 247.5)
    {
        vehicle.setAttribute("src", "images/vehicle16.png");
    }
    else if(vehicleAngle >= 247.5 && vehicleAngle < 262.5)
    {
        vehicle.setAttribute("src", "images/vehicle15.png");
    }
    else if(vehicleAngle >= 262.5 && vehicleAngle < 277.5)
    {
        vehicle.setAttribute("src", "images/vehicle3.png");
    }
    else if(vehicleAngle >= 277.5 && vehicleAngle < 292.5)
    {
        vehicle.setAttribute("src", "images/vehicle9.png");
    }
    else if(vehicleAngle >= 292.5 && vehicleAngle < 307.5)
    {
        vehicle.setAttribute("src", "images/vehicle8.png");
    }
    else if(vehicleAngle >= 307.5 && vehicleAngle < 322.5)
    {
        vehicle.setAttribute("src", "images/vehicle7.png");
    }
    else if(vehicleAngle >= 322.5 && vehicleAngle < 337.5)
    {
        vehicle.setAttribute("src", "images/vehicle6.png");
    }
    else if(vehicleAngle >= 337.5 && vehicleAngle < 352.5)
    {
        vehicle.setAttribute("src", "images/vehicle5.png");
    }

    steeringMultiplier = 0.2

    if(throttle > 0 && vehicleDirection == "forwards")
    {
        if(vehicleAngle >= 0 && vehicleAngle < 90)
        {
            if(vehicle_left < 95 && vehicle_top > 0)
            {
                vehicle_left = vehicle_left + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - vehicleAngle / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (vehicleAngle / 90) * coefficient) ;
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 90 && vehicleAngle < 180)
        {
            if(vehicle_left > 0 && vehicle_top > 0)
            {
                vehicle_left = vehicle_left - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (180 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((180 - vehicleAngle) / 90) * coefficient) ;
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 180 && vehicleAngle < 270)
        {
            if(vehicle_left > 0 && vehicle_top < 90)
            {
                vehicle_left = vehicle_left - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((270 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (270 - vehicleAngle) / 90) * coefficient);
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 270 && vehicleAngle <= 360)
        {
            if(vehicle_left < 95 && vehicle_top < 90)
            {
                vehicle_left = vehicle_left + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (360 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((360 - vehicleAngle) / 90) * coefficient);
                vehicle.style.top = vehicle_top + "%";
            }
        }
    }
    else if(throttle > 0 && vehicleDirection == "backwards")
    {
        if(vehicleAngle >= 0 && vehicleAngle < 90)
        {
            if(vehicle_left > 0 && vehicle_top < 90)
            {
                vehicle_left = vehicle_left - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - vehicleAngle / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (vehicleAngle / 90) * coefficient) ;
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 90 && vehicleAngle < 180)
        {
            if(vehicle_left < 95 && vehicle_top < 90)
            {
                vehicle_left = vehicle_left + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (180 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((180 - vehicleAngle) / 90) * coefficient) ;
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 180 && vehicleAngle < 270)
        {
            if(vehicle_left < 95 && vehicle_top > 0)
            {
                vehicle_left = vehicle_left + (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((270 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (270 - vehicleAngle) / 90) * coefficient);
                vehicle.style.top = vehicle_top + "%";
            }
        }
        else if(vehicleAngle >= 270 && vehicleAngle <= 360)
        {
            if(vehicle_left > 0 && vehicle_top > 0)
            {
                vehicle_left = vehicle_left - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * (1 - (360 - vehicleAngle) / 90));
                vehicle.style.left = vehicle_left + "%";

                vehicle_top = vehicle_top - (0.04 * ((throttle * (1 - (steering * steeringMultiplier / 100))) / 100) * ((360 - vehicleAngle) / 90) * coefficient);
                vehicle.style.top = vehicle_top + "%";
            }
        }

    }

    
    if((steeringDirection == "left" && vehicleDirection == "forwards") || (steeringDirection == "right" && vehicleDirection == "backwards"))
    {
        vehicleAngle = vehicleAngle + ((throttle * (steering * 0.5)) / 15000);
    }
    else if((steeringDirection == "right" && vehicleDirection == "forwards") || (steeringDirection == "left" && vehicleDirection == "backwards"))
    {
        vehicleAngle = vehicleAngle - ((throttle * (steering * 0.5)) / 15000);
    }

    if(vehicleAngle > 360)
    {
        vehicleAngle = 0;
    }
    else if(vehicleAngle < 0)
    {
        vehicleAngle = 360;
    }

}
