import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Dashboard_Professor = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [registrationOpen, setRegistrationOpen] = useState(false);


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


    //checking registration is open or not
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/v1/course/check_registration_time_on_or_not`);
            // console.log(response);

            if (response.data.d) {
                const startTime = new Date(response.data.d.startTime);
                const endTime = new Date(response.data.d.endTime);

                // console.log("Strating date : "+startTime);
                // console.log("Ending date : "+endTime);

                const currentDateTime = new Date();

                // Check if the current date and time is between the range
                const isRegistrationOpen =
                    currentDateTime >= startTime && currentDateTime <= endTime;

                // console.log(isRegistrationOpen);

                setRegistrationOpen(isRegistrationOpen);
            }
            else {
                // console.log("Registration is closed");
                // toast.error("Registration is closed");
            }
        }
        catch (error) {
            // console.error('Error fetching date and time range:', error);
            toast.error("Error fetching date and time range of course registration");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <Layout title={"Professor Dashboard-Hogwart Portal"}>

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
                                    <NavLink className="nav-link active" style={{borderTop: "2px solid black"}} aria-current="page" to="/dashboard_professor">Dashboard</NavLink>
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


                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Quick Links</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">

                        <div className="feature col">
                            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                <img className="feature_au" src="image/course_directry.png" alt="Course Directry" />
                            </div>
                            <h3 className="fs-2 text-body-emphasis">Course Directory</h3>
                            <p>Details about all of the course which are running in Ahmedabad University and also add to new courses.</p>
                            <NavLink to="/course_directory" className="icon-link">More Details</NavLink>
                        </div>

                        <div className="feature col">
                            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                <img src="image/reset_password.png" alt="Reset Password" className="feature_au" />
                            </div>
                            <h3 className="fs-2 text-body-emphasis">Reset Password</h3>
                            <p>If you have to change your AURIS Password, then go ahed.</p>
                            <NavLink to="/forgot_password" className="icon-link"> More Details</NavLink>
                        </div>

                        {registrationOpen === true ?
                            (
                                <div>
                                </div>
                            ) :
                            (
                                <div>
                                    <div className="feature col">
                                        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                            <img src="image/allRights.png" alt="All writes" className="feature_au" />
                                        </div>
                                        <h3 className="fs-2 text-body-emphasis">Courses</h3>
                                        <p>Details of courses which you are teaching in Ahmedabad University.</p>
                                        <NavLink to="/professor_courses" className="icon-link"> More Details</NavLink>
                                    </div>
                                </div>
                            )}
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

export default Dashboard_Professor;