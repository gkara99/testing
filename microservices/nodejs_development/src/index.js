const app = require("express")();
const cors = require("cors");
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const PORT = 8081;
const database = "mongodb://iot_project_mongodb:27017/";
let sensors_db;


mongo.connect(database, function(err, db) {
    if(err) throw err;
    sensors_db = db.db("sensors_db");

    
    sensors_db.collection("sensors").find({}).toArray(function(err, result) {
        if(err) throw err;

        if(!result.length)
        {
            let obj = [
                { description: "IMU", roll: 0, pitch: 0, yaw: 0 },
                { description: "controlledVehicleData", throttle: 0, vehicleDirection: "none", steering: 0, steeringDirection: "center", frontLeft: 0, frontRight: 0,
                rearLeft: 0, rearRight: 0}
            ];

            sensors_db.collection("sensors").insertMany(obj, function(err, result) {
                if(err) throw err;
            });
        }
    });
});

app.use(cors());

app.listen(
    PORT,
    () => console.log("API up and running")
);


app.get("/write", (req, res) => {

    if(req.query.description === undefined)
    {
        res.status(404).send("Not found");
    }
    else
    {
        let query = { description: req.query.description };
        let values;
        
        if(req.query.description === "IMU")
        {
            values = { $set: { roll: +req.query.roll, pitch: +req.query.pitch, yaw: +req.query.yaw } };
        }
        else
        {
            values = { $set: { throttle: +req.query.throttle, vehicleDirection: req.query.vehicleDirection, steering: +req.query.steering, 
                     steeringDirection: req.query.steeringDirection, frontLeft: +req.query.frontLeft, frontRight: +req.query.frontRight, rearLeft: +req.query.rearLeft, 
                     rearRight: +req.query.rearRight } };
        }

        sensors_db.collection("sensors").updateOne(query, values, function(err, result) {
            if(err) throw err;
            res.status(200).send(result);
        });
    }
});


app.get("/read", (req, res) => {

    let query = { description: req.query.description };

    sensors_db.collection("sensors").findOne(query, function(err, result) {
        if(err) throw err;
        res.status(200).send(result);
    });
});