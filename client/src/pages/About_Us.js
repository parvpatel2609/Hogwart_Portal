import React from 'react';
import Layout from './../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const About_Us = () => {

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

    return (
        <Layout title={"About -Hogwarts Portal"}>

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

                            {
                                auth?.user?.role === "Student" ?
                                    (
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/dashboard_student">Dashboard</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/event">Event</NavLink>
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
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/event">Event</NavLink>
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
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/event">Event</NavLink>
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

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Thumbnail [100%x225]"
                                        style={{ height: 450, width: '100%', display: 'block' }}
                                        src="/image/Parv.jpeg" data-holder-rendered="true" />
                                    <div className="card-body">
                                        <h2 className="card-text" style={{ fontFamily: "'Pirata One', cursive" }}>Parv Patel</h2>
                                        <p className="card-text">Email id: parvpatel2609@gmail.com</p>
                                        <p className="card-text">Contact: +91 9974707548</p>
                                        <p className="card-text">LinkedIn: <NavLink to="https://www.linkedin.com/in/parv-patel-348a34225/"> linkedin.com/in/parv-patel-348a34225/ </NavLink></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default About_Us;