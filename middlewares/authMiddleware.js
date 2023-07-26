import JWT from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import professorModel from '../models/professorModel.js';
import studentModel from '../models/studentModel.js';

//protected routes token base 
export const requireSignIn = async (req, res, next) => {
    // console.log(req.headers, " printing_reqqq");
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        console.log(error);
    }
}


//admin access 
export const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await adminModel.findById(req.user._id);
        if (!user) {
            return res.send({
                success: false,
                message: "UnAuthorized Access admin middleware"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(402).send({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }
}


//professor access
export const isProfessor = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await professorModel.findById(req.user._id);
        if (!user) {
            return res.send({
                success: false,
                message: "UnAuthorized Access professor middleware"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in professor middleware"
        })
    }
}


//student access
export const isStudent = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await studentModel.findById(req.user._id);
        if (!user) {
            return res.send({
                success: false,
                message: "UnAuthorized Access in Student middelware"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in student middleware"
        })
    }
}
