import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Update_Attendence = () => {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    //function for handlelogout 
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
        localStorage.removeItem('course_id');
        navigate('/');
        toast.success("Logout Succefully");
    }

    //get all student who enroll in course
    const getStudentEnroll = async () => {
        try {
            const { user } = JSON.parse(localStorage.getItem("auth"));
            const col_email = user.col_email;

            const id = JSON.parse(localStorage.getItem("course_id"));

            const res = await axios.post("/api/v1/grade/get_student_details", { col_email, id });

            if (res.data) {
                // console.log(res.data.student_enroll);
                setStudents(res.data.student_enroll.students_enroll);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting student enroll details from database");
        }
    }

    useEffect(() => {
        getStudentEnroll();
    }, []);


    //updating student attendance by id
    const handleStudentid = async (id) => {
        try {
            const course_id = JSON.parse(localStorage.getItem("course_id"));

            const res = await axios.post("/api/v1/grade/update_attendence", { course_id, id });

            if (res.data) {
                // console.log(res.data.student_enroll);
                setStudents(res.data.student_enroll.students_enroll);
                window.location.reload();
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in updating student attendance");
        }
    }

    //updating decreasing student attendance by id
    const decreaseAttendanceHandler = async (id) => {
        try {
            const course_id = JSON.parse(localStorage.getItem("course_id"));

            const res = await axios.post("/api/v1/grade/update_decrease_attendance", { course_id, id });

            if (res.data) {
                // console.log(res.data.student_enroll);
                setStudents(res.data.student_enroll.students_enroll);
                window.location.reload();
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in updating student attendance");
        }
    }

    return (
        <Layout title={"Update Attendence"}>
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
                                    <NavLink className="nav-link" aria-current="page" to="/dashboard_professor">Dashboard</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/event">Event</NavLink>
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
                    <h2 className="pb-2 border-bottom" style={{ textAlign: 'center' }}> Enrolled Students Detail </h2>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email id</th>
                                <th scope="col">Present</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        {students.map(stu => (
                            <tbody>
                                <tr>
                                    <td>
                                        {stu.student_id.name}
                                    </td>
                                    <td>
                                        {stu.student_id.col_email}
                                    </td>
                                    <td>
                                        {stu.Attendence}
                                    </td>
                                    <td>
                                        <button onClick={() => { handleStudentid(stu.student_id._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Add</button>
                                    </td>
                                    <td>
                                        <button onClick={() => { decreaseAttendanceHandler(stu.student_id._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Decrease</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
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

export default Update_Attendence;