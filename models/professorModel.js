//importing all require files, modules
import mongoose from "mongoose";


//mongoose Schema of professor
const professorSchema = new mongoose.Schema({
    role:{
        type: String,
        require: true
    },
    house_master:{
        type: String,
        default: ""
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
        require: true,
    },
    birth_date: Date,
    col_email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});


//export professorSchema usinn mongoose model method
export default mongoose.model('professors', professorSchema);