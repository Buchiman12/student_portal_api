const express = require("express")
const mongoose = require("mongoose")
const studentRoute = require("./routes/studentRoutes.js")


const compass_string = "mongodb://localhost:27017/student_portal_db";


mongoose.connect(compass_string)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error: ", err))

const app = express()
const port = 5555;


app.use(express.json())

app.get("/", (req, res) => {
    res.send("Student Portal API is active and running");
});


app.use("/students", studentRoute)

app.listen(port, () => {
    console.log(`Server RUNNING on port ${port}`)
});