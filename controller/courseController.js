import courseModel from "../models/courseModel.js";
import registrationModel from "../models/registrationModel.js";
import studentModel from "../models/studentModel.js";

//add new course || Admin
export const addcourseController = async (req, res) => {
    try {
        // console.log(req.body);

        //validation
        if (!req.body.course_name) {
            return res.send({ message: "Course name is Required" });
        }
        if (!req.body.faculty) {
            return res.send({ message: "For this course Faculty is Required" });
        }
        if (!req.body.credit) {
            return res.send({ message: "Credit of course is Required" });
        }
        if (!req.body.description) {
            return res.send({ message: "Description of course is Required" });
        }

        //check course in database
        const exisiting_c = await courseModel.findOne({ course_name: req.body.course_name });
        //exisiting course
        if (exisiting_c) {
            return res.status(200).send({
                success: false,
                message: "Course is already exist"
            });
        }

        const c = new courseModel({
            course_name: req.body.course_name,
            faculty: req.body.faculty,
            credit: req.body.credit,
            description: req.body.description
        });
        c.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "New course added in Course Directory",
            c
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Add new course",
            error
        });
    }
}


//get all courses
export const getCourseController = async (req, res) => {
    try {
        const course = await courseModel.find();
        res.status(201).send({
            success: true,
            message: "All courses details",
            course
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in for getting course",
            error
        });
    }
}


//delete course
export const deleteCourseController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const co = await courseModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Course deleted successfully",
            co
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in for deleting course",
            error
        });
    }
}


//post method registration time ||Admin
export const registrationtimeController = async (req, res) => {
    try {
        //validation
        if (!req.body.term) {
            return res.send({ message: "Registartion term is Required" });
        }
        if (!req.body.startTime) {
            return res.send({ message: "Registartion start time is Required" });
        }
        if (!req.body.endTime) {
            return res.send({ message: "Registartion end time is Required" });
        }

        //check term in database
        const exisiting_term = await registrationModel.findOne({ term: req.body.term });
        //if term is exisiting
        if (exisiting_term) {
            return res.status(200).send({
                success: false,
                message: "Term is already exist",
                exisiting_term
            });
        }

        const reg = new registrationModel({
            term: req.body.term,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });
        reg.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "New term course registration start and end time is stored in database",
            reg
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in for set course registration date and time from adminside",
            error
        });
    }
}


//get method of registration time || Student
export const getRegistrationTimeController = async (req, res) => {
    try {
        const d = await registrationModel.findOne({ term: "Monsoon 2023" });
        // console.log(d);
        if (!d) {
            res.status(203).send({
                success: false,
                message: "Error in getting monsoon term registration date and time"
            });
        }
        else {
            res.status(201).send({
                success: true,
                message: "Monsoon term course registration start and end time is get from database",
                d
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in for get details course registration date and time from studentside",
            error
        });
    }
}


//post method of getting register course || Student
export const getcourseRegistrationController = async (req, res) => {
    try {
        if (!req.body.col_email) {
            return res.send({ message: "College email id is Required to course registration" });
        }

        //finding student
        const st = await studentModel.findOne({ col_email: req.body.col_email });
        if (!st) {
            res.status(203).send({
                success: false,
                message: "Student not found"
            });
        }

        let cour_regis = [];
        // console.log(st.course);

        for (const item of st.course) {
            const cou_6 = await courseModel.findById(item);
            // console.log("course" + cou_6);
            cour_regis.push(cou_6);
        }

        res.status(201).send({
            success: true,
            message: "Student course registration details send",
            course: cour_regis
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in for course registration from studentside",
            error
        });
    }
}


//post method to add new course in student course register || Student
export const addNewCourseStudentRegisterController = async (req, res) => {
    try {
        //validation
        if (!req.body.col_email) {
            return res.send({ message: "College email id is Required to course registration" });
        }

        //finding student
        const stu = await studentModel.findOne({ col_email: req.body.col_email });
        if (!stu) {
            res.status(203).send({
                success: false,
                message: "Student not found"
            });
        }

        if (stu.course.includes(req.body.id)) {
            console.log("Hello");
            res.status(203).send({
                success: false,
                message: "Student can not take same course twice in course registration"
            });
        }
        else {
            //finding course 
            const c1 = await courseModel.findById(req.body.id);

            //update course array in student schema
            const stude = await studentModel.findOneAndUpdate({ col_email: req.body.col_email }, { course: [...stu.course, c1] });
            stude.save();

            const st3 = await studentModel.findOne({ col_email: req.body.col_email });

            res.status(201).send({
                success: true,
                message: "Course is added in your course registration",
                course: st3.course
            });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding new course in register courses array in registration from studentside",
            error
        });
    }
}

//post method to drop course in student course register || student
export const dropCourseRegistrationController = async (req, res) => {
    try {
        //validation
        if (!req.body.col_email) {
            return res.send({ message: "College email id is Required to course registration" });
        }
        if (!req.body.id) {
            return res.send({ message: "Course ID is Required to drop course registration" });
        }

        //finding student
        const stu8 = await studentModel.findOneAndUpdate({ col_email: req.body.col_email }, {$pull: {course: req.body.id}});
        stu8.save();

        const d = await studentModel.findOne({col_email: req.body.col_email});

        res.status(201).send({
            success: true,
            message: "Course is droped in your course registration",
            course: d.course
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in droping course in register courses array in registration from studentside",
            error
        });
    }
}