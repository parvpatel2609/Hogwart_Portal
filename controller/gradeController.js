import professorModel from "../models/professorModel.js";
import courseModel from "../models/courseModel.js";
import gradeModel from "../models/gradeModel.js";
import studentModel from "../models/studentModel.js";


//post method for finding professor courses from course directory
export const findProfessorCourseController = async (req, res) => {
    try {
        //validation
        if (!req.body.col_email) {
            return res.send({ message: "Professor college email id is Required" });
        }

        const fac = await professorModel.findOne({ col_email: req.body.col_email });
        // console.log("Faculty object :" + fac);

        const pro_teach_cou = await courseModel.find({ faculty: fac.name });
        // console.log("Faculty teaching this courses: " + pro_teach_cou);

        const p = await gradeModel.findOne({ professor_id: fac._id });

        if (!p) {
            for (const item of pro_teach_cou) {
                const g = new gradeModel({
                    professor_id: fac._id,
                    course_id: item._id
                });
                g.save();
            }
        }

        res.status(201).send({
            success: true,
            message: "Professor teaching courses in AU details send",
            course: pro_teach_cou
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching professor courses from course directory",
            error
        });
    }
}


//post method for student enroll in course store in database
export const studentEnrollController = async (req, res) => {
    try {
        //validation
        if (!req.body.col_email) {
            return res.send({ message: "Professor college email id is Required" });
        }
        if (!req.body.id) {
            return res.send({ message: "Course id is Required" });
        }

        const f1 = await professorModel.findOne({ col_email: req.body.col_email });

        // console.log("faculty id:" + f1._id);
        // console.log("Course id:" + req.body.id);

        const stu_enroll = await studentModel.find({ course: req.body.id });
        const h = await gradeModel.findOne({ course_id: req.body.id });
        console.log("GradeSchema: " + h);

        for (const item of stu_enroll) {
            // console.log(item._id);

            await gradeModel.findOne({ course_id: req.body.id })
                .then(grade => {

                    if (grade.count !== 1) {
                        grade.students_enroll.push({
                            student_id: item._id, // Replace with the actual student ID
                            Attendence: 0,
                            marks: 0
                        });
                    }

                    // Save the updated grade document
                    grade.save();
                }).then(updatedGrade => {
                    // console.log('Student added successfully:');
                })
                .catch(error => {
                    console.error('Error adding student:', error);
                    res.status(203).send({
                        success: true,
                        message: "error in adding student in gradeSchema successfully"
                    });
                });
        }

        const x = await gradeModel.findOneAndUpdate({ course_id: req.body.id }, { count: 1 });
        x.save();

        res.status(201).send({
            success: true,
            message: "Students added successfully in course",
            stu_enroll
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in enrolling student in particular course",
            error
        });
    }
}


//post method to getStudentEnroll in course
export const getStudentDetailsController = async (req, res) => {
    try {
        //validation
        if (!req.body.col_email) {
            return res.send({ message: "Professor college email id is Required" });
        }
        if (!req.body.id) {
            return res.send({ message: "Course id is Required" });
        }

        const f5 = await professorModel.findOne({ col_email: req.body.col_email });

        const pop = await gradeModel.findOne({ course_id: req.body.id }).populate("students_enroll.student_id");

        // let stu_enroll_grade = [];

        // for(const item of pop.students_enroll){
        //     const student5 = await gradeModel.findById(item.student_id);
        //     stu_enroll_grade.push(student5);
        // }

        res.status(201).send({
            success: true,
            message: "Students which are enroll in course are sended",
            student_enroll: pop
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching students in particular course",
            error
        });
    }
}


//post method of updating (increasing) attendence from professor side
export const updateAttendenceController = async (req, res) => {
    try {
        //validation
        if (!req.body.id) {
            return res.send({ message: "Student id is Required" });
        }
        if (!req.body.course_id) {
            return res.send({ message: "Course id is Required" });
        }

        const grade = await gradeModel.findOne({ course_id: req.body.course_id });

        // Find the index of the student in the students_enroll array
        const studentIndex = grade.students_enroll.findIndex(student => student.student_id.toString() === req.body.id);

        if (studentIndex === -1) {
            res.status(402).send({
                success: false,
                message: "Student not found in enrolled student list!"
            })
        }

        // Update (increase) the attendance of student
        grade.students_enroll[studentIndex].Attendence = grade.students_enroll[studentIndex].Attendence + 1;

        await grade.save();

        res.status(201).send({
            success: true,
            message: "Student attendence are updated",
            student_enroll: grade
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating students attendence in course",
            error
        });
    }
}


//post method of updating marks of student from professor side
export const updateMarksController = async (req, res) => {
    try {
        //validation
        if (!req.body.id) {
            return res.send({ message: "Student id is Required" });
        }
        if (!req.body.marks) {
            return res.send({ message: "Student marks is Required as a input" });
        }
        if (!req.body.course_id) {
            return res.send({ message: "Course id is Required" });
        }

        const grade = await gradeModel.findOne({ course_id: req.body.course_id });

        // Find the index of the student in the students_enroll array
        const studentIndex = grade.students_enroll.findIndex(student => student.student_id.toString() === req.body.id);

        if (studentIndex === -1) {
            res.status(402).send({
                success: false,
                message: "Student not found in enrolled student list!"
            })
        }

        //update the marks of student
        grade.students_enroll[studentIndex].marks = req.body.marks;

        await grade.save();

        res.status(201).send({
            success: true,
            message: "Student marks are updated",
            student_enroll: grade
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating students marks in course",
            error
        });
    }
}

//post method for get Student attendance & marks from student side
export const giveStudentAttendanceMarksController = async (req, res) => {
    try {
        //validation
        if (!req.body.id) {
            return res.send({ message: "Student id is Required" });
        }
        if (!req.body.course_id) {
            return res.send({ message: "Course id is Required" });
        }

        const attendance_marks = await gradeModel.findOne({ course_id: req.body.course_id, "students_enroll.student_id": req.body.id }, { "students_enroll.$": 1 }).populate("course_id");

        // const course = await courseModel.findById(req.body.course_id);

        res.status(201).send({
            success: true,
            message: "Student attendance & marks are send",
            attendance_marks
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting student attendance & marks in course",
            error
        });
    }
}

//post method updating (decreasing) attendance from professor side
export const decreasingAttendanceController = async (req, res) => {
    try {
        //validation
        if (!req.body.id) {
            return res.send({ message: "Student id is Required" });
        }
        if (!req.body.course_id) {
            return res.send({ message: "Course id is Required" });
        }

        const grade = await gradeModel.findOne({ course_id: req.body.course_id });

        // Find the index of the student in the students_enroll array
        const studentIndex = grade.students_enroll.findIndex(student => student.student_id.toString() === req.body.id);

        if (studentIndex === -1) {
            res.status(402).send({
                success: false,
                message: "Student not found in enrolled student list!"
            })
        }

        // Update (decrease) the attendance of student
        if (grade.students_enroll[studentIndex].Attendence > 0) {
            grade.students_enroll[studentIndex].Attendence = grade.students_enroll[studentIndex].Attendence - 1;

            await grade.save();

            res.status(201).send({
                success: true,
                message: "Student attendence are updated",
                student_enroll: grade
            });

        }
        else{
            res.status(201).send({
                success: true,
                message: "Student attendence isn't in negative",
                student_enroll: grade
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating students attendence in course",
            error
        });
    }
}