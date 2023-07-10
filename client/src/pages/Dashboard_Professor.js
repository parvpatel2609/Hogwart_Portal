import React from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard_Professor = () => {

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
        navigate('/');
        toast.success("Logout Succefully");
    }




    return (
        <Layout title={"Professor Dashboard"}>

            <div>
                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">

                    <div className="container-fluid">
                        <NavLink className="navbar-brand" id="logo" to="/">
                            <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
                        </NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Dashboard</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Events</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
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
                            <NavLink href="/course_directory" className="icon-link">More Details</NavLink>
                        </div>

                        <div className="feature col">
                            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                <img src="image/reset_password.png" alt="Reset Password" className="feature_au" />
                            </div>
                            <h3 className="fs-2 text-body-emphasis">Reset Password</h3>
                            <p>If you have to change your AURIS Password, then go ahed.</p>
                            <NavLink to="/forgot_password" className="icon-link"> More Details</NavLink>
                        </div>

                        <div className="feature col">
                            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                <img src="image/allRights.png" alt="All writes" className="feature_au" />
                            </div>
                            <h3 className="fs-2 text-body-emphasis">Courses</h3>
                            <p>Details of courses which you are teaching in Ahmedabad University.</p>
                            <NavLink href="/professor_teaching" className="icon-link"> More Details</NavLink>
                        </div>

                    </div>
                </div>

                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">© 2023 Company: Ahmedabad University, Inc</p>
                    <NavLink to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    </NavLink>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><NavLink href="Admin_dashboard" className="nav-link px-2 text-body-secondary">Home</NavLink></li>
                        <li className="nav-item"><NavLink href="https://ahduni.edu.in/about-ahmedabad/" className="nav-link px-2 text-body-secondary">About</NavLink></li>
                    </ul>

                </footer>
            </div>

        </Layout>
    )
}

export default Dashboard_Professor;