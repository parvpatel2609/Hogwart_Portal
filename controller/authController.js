//import file or modules which are required here
import studentModel from "../models/studentModel.js";
import adminModel from "../models/adminModel.js";
import professorModel from "../models/professorModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';
import { generateRandomNumber, isExpired } from "./randomNumberGenerate.js";
import { transporter } from "./mailSender.js"


//function for register Student or Professor or admin after checking perfect validation
export const registerController = async (req, res) => {
    try {
        const role = req.body.role;
        console.log(role);

        //validation for role
        if (!role) {
            return res.send({ message: "Role is Required" });
        }

        if (role === "Student") {
            // console.log(req.body);
            //validation 
            if (!req.body.name) {
                return res.send({ message: "Name is Required" });
            }
            if (!req.body.house) {
                return res.send({ message: "House of Student is Required" });
            }
            if (!req.body.per_email) {
                return res.send({ message: "Personal email id of Student is Required" });
            }
            if (!req.body.number) {
                return res.send({ message: "Student mobile number is Required" });
            }
            if (!req.body.birth_date) {
                return res.send({ message: "Student birth date is Required" });
            }
            if (!req.body.col_email) {
                return res.send({ message: "College email id of Student is Required" });
            }
            if (!req.body.password) {
                return res.send({ message: "Password is Required" });
            }


            //checking Student in database 
            const exisiting_s = await studentModel.findOne({ col_email: req.body.col_email });
            //exisiting Student
            if (exisiting_s) {
                return res.status(200).send({
                    success: false,
                    message: "Student is already exist"
                });
            }

            //register Student
            const hashedPassword = await hashPassword(req.body.password);

            //save student
            const stu = new studentModel({
                role: req.body.role,
                house: req.body.house,
                name: req.body.name,
                per_email: req.body.per_email,
                number: req.body.number,
                birth_date: req.body.birth_date,
                col_email: req.body.col_email,
                password: hashedPassword
            });
            stu.save();

            //sending success response
            res.status(201).send({
                success: true,
                message: "Student register successfully",
                stu
            });

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.per_email,
                subject: 'Your Hogwart Portal is ready',
                text: `I hope you are fine. In hogwart portal your role is student. Your college email id is : ${req.body.col_email}, your house is : ${req.body.house}, and password is : ${req.body.password}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        }

        if (role === "Admin") {

            //validation 
            if (!req.body.name) {
                return res.send({ message: "Name is Required" });
            }
            if (!req.body.per_email) {
                return res.send({ message: "Personal email id of Admin is Required" });
            }
            if (!req.body.number) {
                return res.send({ message: "Admin mobile number is Required" });
            }
            if (!req.body.birth_date) {
                return res.send({ message: "Admin birth date is Required" });
            }
            if (!req.body.col_email) {
                return res.send({ message: "College email id of Admin is Required" });
            }
            if (!req.body.password) {
                return res.send({ message: "Password is Required" });
            }


            //checking Admin database
            const existing_ad = await adminModel.findOne({ col_email: req.body.col_email });
            //exisiting Student
            if (existing_ad) {
                return res.status(200).send({
                    success: false,
                    message: "Admin is already exist"
                })
            }

            //register Admin
            const hashedPassword = await hashPassword(req.body.password);

            //save Admin
            const adm = new adminModel({
                role: req.body.role,
                name: req.body.name,
                per_email: req.body.per_email,
                number: req.body.number,
                birth_date: req.body.birth_date,
                col_email: req.body.col_email,
                password: hashedPassword
            });
            adm.save();

            //sending success response
            res.status(201).send({
                success: true,
                message: "Admin register successfully",
                adm
            });
        }

        if (role === "Professor") {

            //validation 
            if (!req.body.name) {
                return res.send({ message: "Name is Required" });
            }
            if (!req.body.per_email) {
                return res.send({ message: "Personal email id of Professor is Required" });
            }
            if (!req.body.number) {
                return res.send({ message: "Professor mobile number is Required" });
            }
            if (!req.body.birth_date) {
                return res.send({ message: "Professor birth date is Required" });
            }
            if (!req.body.col_email) {
                return res.send({ message: "College email id of Professor is Required" });
            }
            if (!req.body.password) {
                return res.send({ message: "Password is Required" });
            }


            //checking Professor database
            const existing_pro = await professorModel.findOne({ col_email: req.body.col_email });
            //exisiting Student
            if (existing_pro) {
                return res.status(200).send({
                    success: false,
                    message: "Professor is already exist"
                })
            }

            //register Professor
            const hashedPassword = await hashPassword(req.body.password);

            //save Professor
            const pro = new professorModel({
                role: req.body.role,
                name: req.body.name,
                per_email: req.body.per_email,
                number: req.body.number,
                birth_date: req.body.birth_date,
                col_email: req.body.col_email,
                password: hashedPassword
            });
            pro.save();

            //sending success response
            res.status(201).send({
                success: true,
                message: "Professor register successfully",
                pro
            });
        }

        if (role === "Admin" || role === "Professor") {
            //only for role admin and professor
            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.per_email,
                subject: 'Your Hogwart Portal is ready',
                text: `I hope you are fine. In hogwart portal your role is ${req.body.role}. Your college email id is : ${req.body.col_email} and password is : ${req.body.password}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        });
    }
}


//function for login after checking perfect validation in database (POST Login)
export const loginController = async (req, res) => {
    try {
        const role = req.body.role;
        console.log("Login" + role);

        //validation for role
        if (!role) {
            return res.send({ error: "Role is Required" });
        }


        //student
        if (role === "Student") {
            if (!req.body.house || !req.body.col_email || !req.body.password) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid house name or email or password"
                });
            }

            //check student
            const user = await studentModel.findOne({ col_email: req.body.col_email });

            //if student not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "Student is not registered"
                });
            }

            //if password not match with database password
            const match = await comparePassword(req.body.password, user.password);
            if (!match || user.house != req.body.house) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password or House"
                });
            }

            //give token
            const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.status(200).send({
                success: true,
                message: "Login Successfully in student portal",
                user,
                token
            });
        }


        //admin
        if (role === "Admin") {
            if (!req.body.col_email || !req.body.password) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            //check admin
            const user = await adminModel.findOne({ col_email: req.body.col_email });

            //if admin not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "Admin is not registered"
                });
            }

            //if password not match with database password
            const match = await comparePassword(req.body.password, user.password);
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password"
                });
            }

            //give token
            const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.status(200).send({
                success: true,
                message: "Login Successfully in hogwart admin portal",
                user,
                token
            });
        }


        //Professor
        if (role === "Professor") {
            if (!req.body.col_email || !req.body.password) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            //check professor
            const user = await professorModel.findOne({ col_email: req.body.col_email });

            //if professor not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "Professor is not registered"
                });
            }

            //if password not match with database password
            const match = await comparePassword(req.body.password, user.password);
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid Password"
                });
            }

            //give token
            const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.status(200).send({
                success: true,
                message: "Login Successfully in hogwart professor portal",
                user,
                token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};


//forgotPasswordController
let randNumber;
export const forgotPasswordController = async (req, res) => {
    try {
        const role = req.body.role;
        console.log(role);
        if (!role) {
            res.status(400).send({ message: "Role is required" });
        }

        if (role === "Student") {
            if (!req.body.house) {
                res.status(400).send({ message: "House of student is required" });
            }
            if (!req.body.col_email) {
                res.status(400).send({ message: "College email id of student is required" });
            }

            //check Student
            const user = await studentModel.findOne({ col_email: req.body.col_email });

            //student not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "Student not found"
                });
            }

            if (user.house != req.body.house) {
                return res.status(406).send({
                    success: false,
                    message: "Student's house is wrong"
                });
            }

            const startTime = Date.now();
            randNumber = generateRandomNumber();
            console.log("Random Number: " + randNumber);

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.col_email,
                subject: 'Reset Password OTP',
                text: `Hello, I hope you are fine. Your reset password otp is: ${randNumber}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            let exp = false;
            //expired otp error with countdown
            const interval = await setInterval(function () {
                if (isExpired(startTime)) {
                    clearInterval(interval);
                    console.log("The OTP has expired.");
                    randNumber = 0;
                    exp = true;
                }
            }, 1000);

            if (exp) {
                res.status(404).send({
                    success: false,
                    message: "OTP is expired. Please try again after sometime."
                });
            }

            const col_email = req.body.col_email;

            res.status(200).send({
                success: true,
                message: "OTP send successfully in your college student account",
                col_email,
                role
            });
        }

        if (role === "Professor") {
            if (!req.body.col_email) {
                res.status(400).send({ message: "College email id of professor is required" });
            }

            //check professor
            const user = await professorModel.findOne({ col_email: req.body.col_email });

            //professor not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "Professor not found"
                });
            }

            console.log(user);


            const startTime = Date.now();
            randNumber = generateRandomNumber();
            console.log("Random Number: " + randNumber);

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.col_email,
                subject: 'Reset Password OTP',
                text: `Hello, I hope you are fine. Your reset password otp is: ${randNumber}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            let exp = false;
            //expired otp error with countdown
            const interval = setInterval(function () {
                if (isExpired(startTime)) {
                    clearInterval(interval);
                    console.log("The OTP has expired.");
                    randNumber = 0;
                    exp = true;
                }
            }, 1000);

            if (exp) {
                res.status(404).send({
                    success: false,
                    message: "OTP is expired. Please try again after sometime."
                });
            }

            const col_email = req.body.col_email;

            res.status(200).send({
                success: true,
                message: "OTP send successfully in yuor professor college accout",
                col_email,
                role
            });
        }

        if (role === "Admin") {
            if (!req.body.col_email) {
                res.status(400).send({ message: "College email id of admin is required" });
            }

            //check admin
            const user = await adminModel.findOne({ col_email: req.body.col_email });

            //admin not found
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "admin not found"
                });
            }

            const startTime = Date.now();
            randNumber = generateRandomNumber();
            console.log("Random Number: " + randNumber);

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.col_email,
                subject: 'Reset Password OTP',
                text: `Hello, I hope you are fine. Your reset password otp is: ${randNumber}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            let exp = false;
            //expired otp error with countdown
            const interval = setInterval(function () {
                if (isExpired(startTime)) {
                    clearInterval(interval);
                    console.log("The OTP has expired.");
                    randNumber = 0;
                    exp = true;
                }
            }, 1000);

            if (exp) {
                res.status(404).send({
                    success: false,
                    message: "OTP is expired. Please try again after sometime."
                });
            }

            const col_email = req.body.col_email;

            res.status(200).send({
                success: true,
                message: "OTP send successfully in your admin college account",
                col_email,
                role
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


//compareOtp
export const otpController = (req, res) => {
    try {
        // console.log(randNumber);
        // console.log("Frontend otp: " + req.body.otp);
        if (randNumber == req.body.otp) {
            res.status(200).send({
                success: true,
                message: "OTP is perfect",
                randNumber
            });
        }
        else {
            res.status(206).send({
                success: false,
                message: "OTP is wrong"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(405).send({
            success: false,
            message: "Something went wrong"
        });
    }
}


//updatePasswrodController
export const updatePasswrodController = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.role === "Student") {
            const hased = await hashPassword(req.body.password);
            await studentModel.findOneAndUpdate({ col_email: req.body.col_email }, { password: hased });
            res.status(200).send({
                success: true,
                message: "Student password reset successfully"
            });
        }

        if (req.body.role === "Professor") {
            const hased = await hashPassword(req.body.password);
            await professorModel.findOneAndUpdate({ col_email: req.body.col_email }, { password: hased });
            res.status(200).send({
                success: true,
                message: "Professor password reset successfully"
            });
        }

        if (req.body.role === "Admin") {
            const hased = await hashPassword(req.body.password);
            await adminModel.findOneAndUpdate({ col_email: req.body.col_email }, { password: hased });
            res.status(200).send({
                success: true,
                message: "Admin password reset successfully"
            });
        }

    }
    catch (error) {
        console.log(error);
        res.status(405).send({
            success: false,
            message: "Something went wrong"
        });
    }
}



//test testController
export const testController = (req, res) => {
    res.send("Protected Route");
}