//importing all require files, modules
import mongoose from "mongoose";


//mongoose Schema of student
const studentSchema = new mongoose.Schema({
    role:{
        type: String,
        require: true
    },
    house:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
        lowercase: true
    },
    per_email: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    birth_date: {
        type: Date,
        require: true
    },
    col_email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    course: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"
        }
    ]
},{timestamps: true});


//export studentSchema using mongoose model method
export default mongoose.model('students', studentSchema);