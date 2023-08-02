import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Event_Participate_Details = () => {

    const [auth, setAuth] = useAuth();
    const [eventDetails, setEventDetails] = useState({name: "", participate: []})

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

    //get participate 
    const getParticipate = async () => {
        const event_id = JSON.parse(localStorage.getItem("event_id"));

        const res = await axios.post("/api/v1/event/details_participate", { event_id });

        if (res.data) {
            // console.log(res.data);
            toast.success(res.data.message);
            setEventDetails({name: res.data.name, participate: res.data.details});
        }
    }

    useEffect(() => {
        getParticipate();
    }, []);

    return (
        <Layout title={"Event Details of Paticipate"}>
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

                <div className="container">

                    <div className="row mb-3 mb-sm-4 ">
                        <div className="col-12 text-center mt-3">
                            <h2>Event: {eventDetails.name}</h2>
                        </div>
                    </div>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Email ID</th>
                            </tr>
                        </thead>
                        {eventDetails.participate.map(p => (
                            <tbody>
                                <tr>
                                    <td>
                                        {p.name}
                                    </td>
                                    <td>
                                        {p.role}
                                    </td>
                                    <td>
                                        {p.col_email}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

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
    )
}

export default Event_Participate_Details;