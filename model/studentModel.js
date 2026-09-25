import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product'}]
});

const studentModel = mongoose.model("Student", studentSchema)

export { studentModel };