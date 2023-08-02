import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Student_courses = () => {

    const [register, setRegisterCourse] = useState([]);
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    //function for handlelogout 
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
        navigate('/');
        toast.success("Logout Succefully");
    }

    //get student courses which he/she is register
    const getRegisterCourse = async () => {
        try {
            const { user } = JSON.parse(localStorage.getItem("auth"));
            const col_email = user.col_email;
            // console.log(col_email);

            const res = await axios.post(`/api/v1/course/get_register_course`, { col_email });
            if (res) {
                // console.log(res.data);
                setRegisterCourse(res.data.course);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting student register course details");
        }
    }

    useEffect(() => {
        getRegisterCourse();
    }, []);


    //onclick of Attendance & marks
    const handleAttendanceandMarks = async (id) => {
        localStorage.setItem('stu_course_id', JSON.stringify(id));
        if (id != null) {
            navigate('/student_course_attendance_marks');
        }
        else {
            toast.error("Something went wrong. Please try after some time");
        }
    }



    return (
        <Layout title={"Student Courses"}>
            <div>
                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">

                    <div className="container-fluid" id="mynavbar">

                        <NavLink className="navbar-brand" id="logo" to="/">
                            <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
                        </NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard_student">Dashboard</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/event">Event</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <h4 style={{ marginRight: "10px", marginTop: "5px" }}>{auth.user.name}</h4>
                                </li>

                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-light btn-outline-danger">Logout</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>

                <video src="/image/Hogwart_tour.mkv" autoPlay loop muted>Hogwart Tour</video>.

                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Course Registered</h2>

                    <div className="row">
                        {register.map(r => (
                            <div className="col-sm-6 col-lg-4 mb-4">
                                {/* Card Start */}
                                <div className="card card-body shadow p-4 h-100">
                                    <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4"><i className="bi bi-lightning-fill fs-5" /></div>
                                    <h5> {r.course_name} </h5>
                                    <h6> Credit: {r.credit}  </h6>
                                    <h6> Faculty: {r.faculty} </h6>
                                    <p> {r.description} </p>
                                    {/* <p> {r._id } </p> */}
                                    <button onClick={() => { handleAttendanceandMarks(r._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Attendance & Marks</button>
                                </div>
                                {/* Card END */}
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">© 2023 Company: Hogwart School, Inc</p>
                    <NavLink to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    </NavLink>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><NavLink className="nav-link px-2 text-body-secondary" to="/about">About</NavLink></li>
                    </ul>

                </footer>
            </div>
        </Layout>
    )
}

export default Student_courses;