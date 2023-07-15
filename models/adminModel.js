//importing all require files, modules
import mongoose from "mongoose";


//mongoose Schema of Admin 
const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    per_email: {
        type: String,
        required: true,
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
    },
},{timestamps: true});


//export adminSchema using mongoose model method
export default mongoose.model('admins', adminSchema);