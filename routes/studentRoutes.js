import {Router} from 'express'
import { 
    createStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent,
    getAllStudent,
    loginUser 
} from "../controller/studentController.js"

const studentRoute = Router();


studentRoute.post("/new-student", createStudent);
studentRoute.get("/single-student/:id", getSingleStudent)
studentRoute.patch("/update-student/:id", updateStudent)
studentRoute.delete("/delete-student/:id", deleteStudent)
studentRoute.get("/all-students", getAllStudent )
studentRoute.get("/login", loginUser )

export { studentRoute };