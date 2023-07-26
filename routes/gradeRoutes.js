import express from "express";
import { isProfessor, isStudent, requireSignIn } from './../middlewares/authMiddleware.js';
import { findProfessorCourseController, getStudentDetailsController, giveStudentAttendanceMarksController, studentEnrollController, updateAttendenceController, updateMarksController } from "../controller/gradeController.js";


//route object
const router = express.Router();


//routing 

//post method of professor teaching courses find 
router.post("/professor_courses", requireSignIn, isProfessor, findProfessorCourseController);

//post method of enrolling student in grade schema
router.post("/enroll_student", requireSignIn, isProfessor, studentEnrollController);

//post method for getting student details which are enroll in course
router.post("/get_student_details", requireSignIn, isProfessor, getStudentDetailsController);

//updating attendence of student
router.post("/update_attendence", requireSignIn, isProfessor, updateAttendenceController);

//updating marks of students
router.post("/update_marks", requireSignIn, isProfessor, updateMarksController);

//get Attendance & marks of student
router.post("/get_student_attendance_marks", requireSignIn, isStudent, giveStudentAttendanceMarksController);



//export router
export default router;