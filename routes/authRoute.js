import express from "express";
import { registerController, loginController, testController, forgotPasswordController, otpController, updatePasswrodController } from "../controller/authController.js"
import { isAdmin, isProfessor, isStudent, requireSignIn } from "../middlewares/authMiddleware.js";

//route object
const router = express.Router();


//routing
//Register || Method Post
router.post('/register', registerController);


//Login || Method Post
router.post('/login', loginController);


//compareOtp
router.post("/compareOtp", otpController);


//updatePassword || Method Post
router.post("/update_password", updatePasswrodController);


//Forgot Password || Method Post
router.post("/forgot-password", forgotPasswordController);


//test 
router.get('/test', requireSignIn, isAdmin, testController);


//protected route student-auth
router.get("/student-auth", requireSignIn, isStudent, (req, res) => {
    res.status(200).send({ ok: true });
})


//protected route admin-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


//protected route professor-auth
router.get("/professor-auth", requireSignIn, isProfessor, (req, res) => {
    res.status(200).send({ ok: true });
})


//export router
export default router;