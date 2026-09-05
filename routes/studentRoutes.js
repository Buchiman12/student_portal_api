const express = require("express")
const { 
    createStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent 
} = require("../controller/studentController")

const studentRoute = express.Router();

// Fixed: Added missing leading slashes to routes for proper Express routing
studentRoute.post("/new-student", createStudent);
studentRoute.get("/single-student/:id", getSingleStudent)
studentRoute.patch("/update-student/:id", updateStudent)
studentRoute.delete("/delete-student/:id", deleteStudent)

module.exports = studentRoute;