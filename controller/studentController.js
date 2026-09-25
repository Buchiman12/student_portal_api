import { studentModel } from "../model/studentModel.js"
import bcrypt from 'bcrypt';


const createStudent = async (req, res) => {
    try {
        const { name, registrationNumber, email, password } = req.body;
        const genSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, genSalt)
        const student = await studentModel.create({
            name,
            registrationNumber,
            email,
            password : hashPassword
        })
        res.status(201).json({
            message: "Student account created successfully",
            data: student
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await studentModel.findOne({email})
        if (!user) {
           return res.status(404).json({message: "user not found, please sign up"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({message: "password not correct"})
        }
        return res.status(200).json({message : "login successful", data: user})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentModel.findById(id);
        
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }   
        
        return res.status(200).json({
            message: "Student details fetched successfully",
            data: student
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { name } = req.body; 
        
        const updatedStudent = await studentModel.findByIdAndUpdate(
            id, 
            { name }, 
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({
            message: "Student profile updated successfully",
            data: updatedStudent
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message 
        })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" })
        }

        return res.status(200).json({
            message: "Student account deleted successfully",
            data: deletedStudent
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllStudent = async (req, res) => {
    try {
        const allStudent = await studentModel.find()
        if(!allStudent){
            return res.status(404).json({
                message: "No student is registered"
            })
        }
        res.status(200).json({
            message: "all students successfully fetched",
            Data: allStudent
        })
    }catch(error){
        res.status(500).json({
            message: `internal server error ${error.message}`
        })
        
    }
}

export { 
    createStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent,
    getAllStudent,
    loginUser
};