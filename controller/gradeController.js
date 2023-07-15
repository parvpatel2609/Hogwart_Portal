import professorModel from "../models/professorModel.js";
import courseModel from "../models/courseModel.js";
import gradeModel from "../models/gradeModel.js";


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

        //get whole course details here 
        // const faculty = await gradeModel.findOne({ professor_id: fac._id });

        // let profe_cou_tech = [];

        // for(const item of faculty.course_id){
        //     const cou_8 = await courseModel.findById(item);

        //     profe_cou_tech.push(cou_8);
        // }

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