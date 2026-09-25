import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose'
import {studentRoute} from './routes/studentRoutes.js';
import { productRoute } from './routes/productRoutes.js';



// const compass_string = process.env.COMPASS_STRING
const atlas_string = process.env.ATLAS_STRING


mongoose.connect(atlas_string)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error: ", err))

const app = express()
const port = 5555;


app.use(express.json())

app.get("/", (req, res) => {
    res.send("Student Portal API is active and running");
});


app.use("/students", studentRoute)
app.use("/student-products", productRoute)

app.listen(port, () => {
    console.log(`Server RUNNING on port ${port}`)
});