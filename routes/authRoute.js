import express from "express";
import { registerController, loginController, testController } from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//route object
const router = express.Router();


//routing
//Register || Method Post
router.post('/register', registerController);


//Login || Method Post
router.post('/login', loginController);


//test 
router.get('/test', requireSignIn, isAdmin, testController);


//export router
export default router;