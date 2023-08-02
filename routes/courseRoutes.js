import express from "express";
import { addcourseController, getcourseRegistrationController, deleteCourseController, getCourseController, getRegistrationTimeController, registrationtimeController, addNewCourseStudentRegisterController, dropCourseRegistrationController } from "../controller/courseController.js";
import { isAdmin, isProfessor, isStudent, requireSignIn } from "../middlewares/authMiddleware.js";


//route object
const router = express.Router();


//routing

//New Course add in Directory
router.post("/add_new_course", requireSignIn, isAdmin, addcourseController);

//get All course directory courses 
router.get("/courser_directory", getCourseController);

//delete course from course directory route
router.delete("/delete_course/:id", requireSignIn, isAdmin, deleteCourseController);


//Registration time where it is start and end
router.post("/registration_time", requireSignIn, isAdmin, registrationtimeController);

//registration get method for is it start or not 
router.get("/check_registration_time_on_or_not",requireSignIn, isProfessor, getRegistrationTimeController);

//registration get method for is it start or not 
router.get("/check_registration_time",requireSignIn, isStudent, getRegistrationTimeController);


//course registration controller 
router.post("/get_register_course", requireSignIn, isStudent, getcourseRegistrationController);


//add new course in register 
router.post("/add_course_student_register", requireSignIn, isStudent, addNewCourseStudentRegisterController);

//drop course in register
router.post("/drop_course_registration", requireSignIn, isStudent, dropCourseRegistrationController);


//export router
export default router;