//importing all require files, modules
import mongoose from "mongoose";


//mongoose Schema of course
const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        require: true,
        unique: true,
    },
    credit: {
        type: Number,
        require: true,
    },
    faculty: {
        type: String,
        require: true,
    },
    description: String,
});


//export courseSchema usinn mongoose model method
export default mongoose.model('courses', courseSchema);