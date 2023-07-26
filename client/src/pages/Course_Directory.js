import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';


const Course_Directory = () => {
    const [course, setCourse] = useState([]);
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

    //get all courses
    const getCourse = async () => {
        try {
            const { data } = await axios.get("/api/v1/course/courser_directory");
            if (data.success) {
                setCourse(data.course);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting all course details");
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    //handleAddnewcourse function to add new course
    const handleAddnewcourse = (e) => {
        e.preventDefault();
        navigate("/add_new_course");
    }


    //handleDeletecourse function for delete course 
    const handleDelete = (e) => {
        e.preventDefault();
        navigate("/delete_course");
    }

    return (
        <Layout title={"Course Directory-Hogwart Portal"}>
            <div>
                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" id="logo">
                            <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
                        </NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            {
                                auth?.user?.role === "Student" ?
                                    (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/dashboard_student">Dashboard</NavLink>
                                            </li>
                                        </ul>
                                    ) :
                                    (
                                        <>
                                        </>
                                    )
                            }

                            {
                                auth?.user?.role === "Professor" ?
                                    (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/dashboard_professor">Dashboard</NavLink>
                                            </li>
                                        </ul>
                                    ) :
                                    (
                                        <>
                                        </>
                                    )
                            }

                            {
                                auth?.user?.role === "Admin" ?
                                    (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/dashboard_admin">Dashboard</NavLink>
                                            </li>
                                        </ul>
                                    ) :
                                    (
                                        <>
                                        </>
                                    )
                            }

                            <ul className="navbar-nav ml-auto">
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
                                </div>
                                {/* Card END */}
                            </div>
                        ))}
                    </div>

                    {
                        auth.user.role === "Admin" ?
                            (
                                <>
                                    <button onClick={handleAddnewcourse} class="btn btn-primary m-3">Add new Course</button>
                                    <button onClick={handleDelete} class="btn btn-primary m-3">Delete Course</button>
                                </>
                            ) :
                            (
                                <>

                                </>
                            )
                    }

                </div>
            </div>
        </Layout>
    )
}

export default Course_Directory;