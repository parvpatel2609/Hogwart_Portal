//importing all require files, modules
import mongoose from "mongoose";


//mongoose schema of grade
const gradeSchema = new mongoose.Schema({
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    students_enroll: [
        {
            student_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "students"
            },
            Attendence: {
                type: Number,
                default: 0
            },
            marks: {
                type: Number,
                default: 0
            }
        }
    ]
});


//export gradeSchema using mongoose model method
export default mongoose.model('grades', gradeSchema);