import express from "express";
import { isProfessor, requireSignIn } from './../middlewares/authMiddleware.js';
import { findProfessorCourseController } from "../controller/gradeController.js";


//route object
const router = express.Router();


//routing 

//post method of professor teaching courses find 
router.post("/professor_courses", requireSignIn, isProfessor, findProfessorCourseController);








//export router
export default router;