import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Delete_Event = () => {

    const [events, setEvents] = useState([]);
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

    //get all events
    const getEvent = async () => {
        try {
            const { data } = await axios.get("/api/v1/event/display_events");
            if (data.success) {
                setEvents(data.event1);
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting all events details");
        }
    }

    useEffect(() => {
        getEvent();
    }, []);

    //delete event method
    const handleDeleteEvent = async (event_id) => {
        try {
            // console.log(event_id);
            const res = await axios.post("/api/v1/event/delete_event", { event_id });
            if (res.data.success) {
                toast.success(res.data.message);
                window.location.reload();
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong to delete event");
        }
    }


    return (
        <Layout title={"Delete Event-Hogwart Portal"}>
            <div>
                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid" id="mynavbar">
                        <NavLink className="navbar-brand" id="logo">
                            <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
                        </NavLink>

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
                </nav>

                <video src="/image/Hogwart_tour.mkv" autoPlay loop muted>Hogwart Tour</video>

                <div className="container">

                    <div className="row mb-3 mb-sm-4 ">
                        <div className="col-12 text-center mt-3">
                            <h2>Events</h2>
                        </div>
                    </div>

                    <div className="row g-4">
                        {events.map(e => (
                            <div className="col-sm-6 col-lg-4">
                                {/* Card Start */}
                                <div className="card card-body shadow p-4 h-100">
                                    <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4"><i className="bi bi-lightning-fill fs-5" /></div>
                                    <h5> {e.name} </h5>
                                    <h6> Date: {new Date(e.date).toLocaleString('en-GB')}  </h6>
                                    <h6> Description: {e.description} </h6>
                                    <p style={{ display: "none" }}> {e._id} </p>
                                    <button onClick={() => { handleDeleteEvent(e._id) }} style={{ width: "fit-content" }} class="btn btn-primary">Delete Event</button>
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

export default Delete_Event;