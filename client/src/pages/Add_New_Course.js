import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_New_Course = () => {

    const [course_name, setCourse_name] = useState("");
    const [faculty, setFaculty] = useState("");
    const [credit, setCredit] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();


    //function for add new course
    const handleAddCourse = async (e) => {
        e.preventDefault();

        try {
            if(credit < 0){
                toast.error("Please enter credit greather than zero or zero");
            }
            else{
                const res = await axios.post("/api/v1/course/add_new_course", {course_name, faculty, credit, description});
                if(res.data.success){
                    toast.success(res.data.message);
                    navigate("/course_directory");
                }
            }   
        } 
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong to add new course");
        }

        

    }



    return (
        <Layout title={"Add New Course-Hogwart Portal"}>
            <div>

                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" id="logo">
                            <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
                        </a>
                    </div>
                </nav>

                <div className="px-4 py-5 my-5 text-center">
                    <div className="col-lg-6 mx-auto">

                        <form>

                            <div className="form-floating mb-3">
                                <input type="text" name="name" value={course_name}
                                    className="form-control" id="floatingInput"
                                    placeholder="Enter your name" required
                                    onChange={(e) => setCourse_name(e.target.value)} />
                                <label htmlFor="floatingInput">Course Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" name="name" value={faculty}
                                    className="form-control" id="floatingInput"
                                    placeholder="Enter your name" required
                                    onChange={(e) => setFaculty(e.target.value)} />
                                <label htmlFor="floatingInput">Faculty</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="number" name="mobile_number" value={credit}
                                    className="form-control" id="floatingInput"
                                    placeholder="Enter mobile number" required
                                    onChange={(e) => setCredit(e.target.value)} />
                                <label htmlFor="floatingInput">Credit</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" value={description} rows="5" 
                                name="description" required  
                                onChange={(e) => setDescription(e.target.value)}/>
                                <label htmlFor="floatingInput">Enter description of course</label>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleAddCourse} className="btn btn-primary btn-lg px-4 gap-3">Add new course</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Add_New_Course;