const studentModel = require("../model/studentModel.js");


const createStudent = async (req, res) => {
    try {
        const { name, registrationNumber, email } = req.body;
        const student = await studentModel.create({
            name,
            registrationNumber,
            email
        })
        res.status(201).json({
            message: "Student account created successfully",
            data: student
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = { 
    createStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent 
};