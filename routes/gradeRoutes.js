import express from "express";
import { isProfessor, requireSignIn } from './../middlewares/authMiddleware.js';
import { findProfessorCourseController, getStudentDetailsController, studentEnrollController } from "../controller/gradeController.js";


//route object
const router = express.Router();


//routing 

//post method of professor teaching courses find 
router.post("/professor_courses", requireSignIn, isProfessor, findProfessorCourseController);

//post method of enrolling student in grade schema
router.post("/enroll_student", requireSignIn, isProfessor, studentEnrollController);

//post method for getting student details which are enroll in course
router.post("/get_student_details", requireSignIn, isProfessor, getStudentDetailsController);



//export router
export default router;