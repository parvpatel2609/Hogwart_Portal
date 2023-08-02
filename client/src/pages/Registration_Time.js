import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';
import axios from 'axios';

const Registration_Time = () => {

    const [term, setTerm] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");

    const navigate = useNavigate();

    const handleRegistrationTime = async (e) => {
        e.preventDefault();

        try {
            if(term==="Select Term"){
                toast.error("Please select term. It is required");
            }
            else{
                const res = await axios.post(`/api/v1/course/registration_time`, {term, startTime, endTime});
                if(res.data.success){
                    toast.success(res.data.message);
                    // console.log(res.data);
                    navigate("/dashboard_admin");
                }
                else{
                    toast.error(res.data.message);
                }
            }
        } 
        catch (error) {
            // console.log(error);
            toast.error(`Something went wrong ${error}`);
        }
    }



    return (
        <Layout title={"Set Registration Time-Hogwart Portal"}>
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

                            <div className="bd-example m-0 border-0">
                                <select className="form-select form-select-lg mb-3" value={term}
                                    name="term" aria-label=".form-select-lg example"
                                    onChange={(e) => setTerm(e.target.value)}>
                                    <option value="Select Term">Select Term</option>
                                    <option value="Monsoon 2023">Monsoon 2023</option>
                                    <option value="Winter 2024">Winter 2024</option>
                                </select>
                            </div>


                            <div id="sq_103" style={{ textAlign: "center" }} className="m-3 sd-element--with-frame sd-element sd-question sd-row__question sd-row__question--small sd-question--answered" data-rendered="r" data-name="datetime-local">
                                <div className="sd-question__header sd-element__header sd-question__header--location-top sd-element__header--location-top">
                                    <h5 className="sd-title sd-element__title sd-question__title sd-question__title--answer" id="sq_103_ariaTitle">
                                        <span className="sv-string-viewer">Select a course Registartion start date and time</span>
                                    </h5>

                                    <div className="sd-description sd-question__description" style={{ display: 'none' }}>
                                        <span className="sv-string-viewer" />
                                    </div>

                                    <div className="sd-text__content sd-question__content" role="presentation" />

                                    <input id="sq_103i" value={startTime} className="sd-input sd-text"
                                        type="datetime-local" max="2999-12-31" placeholder aria-required="false"
                                        aria-labelledby="sq_103_ariaTitle" aria-invalid="false" data-rendered="r"
                                        onChange={(e) => setstartTime(e.target.value)} />

                                </div>
                            </div>


                            <div id="sq_103" style={{ textAlign: "center" }} className="m-3 sd-element--with-frame sd-element sd-question sd-row__question sd-row__question--small sd-question--answered" data-rendered="r" data-name="datetime-local">
                                <div className="sd-question__header sd-element__header sd-question__header--location-top sd-element__header--location-top">
                                    <h5 className="sd-title sd-element__title sd-question__title sd-question__title--answer" id="sq_103_ariaTitle">
                                        <span className="sv-string-viewer">Select a course Registartion end date and time</span>
                                    </h5>

                                    <div className="sd-description sd-question__description" style={{ display: 'none' }}>
                                        <span className="sv-string-viewer" />
                                    </div>

                                    <div className="sd-text__content sd-question__content" role="presentation" />

                                    <input id="sq_103i" value={endTime} className="sd-input sd-text"
                                        type="datetime-local" max="2999-12-31" placeholder aria-required="false"
                                        aria-labelledby="sq_103_ariaTitle" aria-invalid="false" data-rendered="r"
                                        onChange={(e) => setendTime(e.target.value)} />

                                </div>
                            </div>


                            <div className="col-auto mb-3">
                                <span id="passwordHelpInline" className="form-text">
                                    Please don't select start and end date same
                                </span>
                            </div>


                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleRegistrationTime} className="btn btn-primary btn-lg px-4 gap-3">Set Time</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Registration_Time;