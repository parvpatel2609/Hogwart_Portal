import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';


const Course_Registration = () => {

    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [course, setCourse] = useState([]);
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


    //checking registration is open or not
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/course/check_registration_time`);
            // console.log(response);

            if (response.data.d) {
                const startTime = new Date(response.data.d.startTime);
                const endTime = new Date(response.data.d.endTime);

                // console.log(startTime);
                // console.log(endTime);

                const currentDateTime = new Date();

                // Check if the current date and time is between the range
                const isRegistrationOpen =
                    currentDateTime >= startTime && currentDateTime <= endTime;

                // console.log(isRegistrationOpen);

                setRegistrationOpen(isRegistrationOpen);
            }
            else {
                toast.error("Registration is closed");
                navigate("/dashboard_student");
            }
        }
        catch (error) {
            // console.error('Error fetching date and time range:', error);
            toast.error("Error fetching date and time range");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //get all courses
    const getCourse = async () => {
        try {
            const { data } = await axios.get("/api/v1/course/courser_directory");
            if (data.success) {
                setCourse(data.course);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting all course details");
        }
    };

    useEffect(() => {
        getCourse();
    }, []);


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


    //add new course handleAddCourseInRegistration
    const handleAddCourseInRegistration = async (id) => {
        try {
            // console.log(id);
            const { user } = JSON.parse(localStorage.getItem("auth"));
            const col_email = user.col_email;
            // console.log(col_email);

            const res = await axios.post(`/api/v1/course/add_course_student_register`, { col_email, id });

            if (res.data.success === true) {
                // console.log(res.data);
                toast.success(res.data.message);
                window.location.reload();
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error(`Something went wrong to add course`);
        }
    }

    //handleDropCourse method
    const handleDropCourse = async (id) => {
        try {
            const { user } = JSON.parse(localStorage.getItem("auth"));
            const col_email = user.col_email;

            const res = await axios.post("/api/v1/course/drop_course_registration", { col_email, id });

            if (res.data.success === true) {
                // console.log(res.data);
                toast.success(res.data.message);
                window.location.reload();
            }
            else {
                toast.error(res.data.message);
            }

        }
        catch (error) {
            // console.log(error);
            toast.error(`Something went wrong to drop course`);
        }
    }


    return (
        <Layout title={"Course Registartion-Hogwart Portal"}>

            {registrationOpen ? (
                <Layout title={"Course Registration-Hogwart Portal"}>
                    <div>
                        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">

                            <div className="container-fluid" id="mynavbar">

                                <NavLink className="navbar-brand" id="logo">
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

                        <video src="/image/Hogwart_tour.mkv" autoPlay loop muted>Hogwart Tour</video>

                        <div className="container">

                            <div className="row mb-3 mb-sm-4 ">
                                <div className="col-12 text-center mt-3">
                                    <h2>Course Register</h2>
                                </div>
                            </div>

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Course</th>
                                        <th scope="col">Faculty</th>
                                        <th scope="col">Credit</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {register.map(r => (
                                    <tbody>
                                        <tr>
                                            <td>
                                                {r.course_name}
                                            </td>
                                            <td>
                                                {r.faculty}
                                            </td>
                                            <td>
                                                {r.credit}
                                            </td>
                                            <td>
                                                <button onClick={() => { handleDropCourse(r._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Drop</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>

                            <div className="row mb-3 mb-sm-4 ">
                                <div className="col-12 text-center mt-3">
                                    <h2>Course Directory</h2>
                                </div>
                            </div>

                            <div className="row g-4">
                                {course.map(co => (
                                    <div className="col-sm-6 col-lg-4">
                                        {/* Card Start */}
                                        <div className="card card-body shadow p-4 h-100">
                                            <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4"><i className="bi bi-lightning-fill fs-5" /></div>
                                            <h5> {co.course_name} </h5>
                                            <h6> Credit: {co.credit}  </h6>
                                            <h6> Faculty: {co.faculty} </h6>
                                            <p> {co.description} </p>
                                            <button onClick={() => { handleAddCourseInRegistration(co._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Add</button>
                                        </div>
                                        {/* Card END */}
                                    </div>
                                ))}
                            </div>
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

                </Layout>
            ) : (
                <Layout title={"Registration Closed-Hogwart Portal"}>
                    <div className="px-4 py-5 my-5 text-center">
                        <a id="logo"><img src="/image/hogwart_school_logo.png" alt="Hogwarts School Logo" /></a>
                        <h3 className="display-5 fw-bold text-body-emphasis">404 Error</h3>
                        <div className="col-lg-6 mx-auto alert-danger alert">
                            <p className="lead mb-4 " /><h4>Registration is closed</h4><p />
                        </div>
                    </div>
                </Layout>
            )}

        </Layout>
    )
}

export default Course_Registration;