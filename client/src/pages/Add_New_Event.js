import React, { useState } from 'react';
import Layout from './../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Add_New_Event = () => {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    //handleSubmit method
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (name === "") {
                toast.error("Please enter event name");
            }
            if(description === ""){
                toast.error("Please enter description");
            }

            const res = await axios.post("/api/v1/event/add_new_event", {name, date, description});

            if(res){
                navigate("/event");
            }
            else{
                toast.error("Error in adding new event");
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong to add new event");
        }
    }

    return (
        <Layout title={"New Event-Hogwart Portal"}>
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
                                <input type="text" name="name" value={name}
                                    className="form-control" id="floatingInput"
                                    placeholder="Enter your name" required
                                    onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            <div id="sq_103" style={{ textAlign: "center" }} className="m-3 sd-element--with-frame sd-element sd-question sd-row__question sd-row__question--small sd-question--answered" data-rendered="r" data-name="datetime-local">
                                <div className="sd-question__header sd-element__header sd-question__header--location-top sd-element__header--location-top">
                                    <h5 className="sd-title sd-element__title sd-question__title sd-question__title--answer" id="sq_103_ariaTitle">
                                        <span className="sv-string-viewer">Select date and time for Event</span>
                                    </h5>

                                    <div className="sd-description sd-question__description" style={{ display: 'none' }}>
                                        <span className="sv-string-viewer" />
                                    </div>

                                    <div className="sd-text__content sd-question__content" role="presentation" />

                                    <input id="sq_103i" value={date} className="sd-input sd-text"
                                        type="datetime-local" max="2999-12-31" placeholder aria-required="false"
                                        aria-labelledby="sq_103_ariaTitle" aria-invalid="false" data-rendered="r"
                                        onChange={(e) => setDate(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" value={description} rows="5"
                                    name="description" required
                                    onChange={(e) => setDescription(e.target.value)} />
                                <label htmlFor="floatingInput">Enter description of course</label>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleSubmit} className="btn btn-primary btn-lg px-4 gap-3">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Add_New_Event;