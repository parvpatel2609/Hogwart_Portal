import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Forgot_Password = () => {

    const [role, setRole] = useState("Select your role in Hogwart School");
    const [col_email, setCol_email] = useState("");
    const [house, setHouse] = useState("Select House of Student");


    const navigate = useNavigate();


    //function for handleResetPassword
    const handleGetOTP = async (e) => {
        e.preventDefault();
        try {
            if (role === "Select your role in Hogwart School") {
                toast.error("Please select your role in Hogwart School");
            }

            if (role === "Student") {
                if (house === "Select House of Student") {
                    toast.error("Please Select House of Student");
                }
                else {
                    const res = await axios.post(`/api/v1/auth/forgot-password`, { role, house, col_email });
                    if (res.data.success) {
                        toast.success(res.data.message);
                        localStorage.setItem("reset", JSON.stringify(res.data));
                        navigate("/otp");
                    }
                }
            }

            if (role === "Professor") {
                const res = await axios.post(`/api/v1/auth/forgot-password`, { role, col_email });
                if (res.data.success) {
                    toast.success(res.data.message);
                    localStorage.setItem("reset", JSON.stringify(res.data));
                    navigate("/otp");
                }
            }

            if (role === "Admin") {
                const res = await axios.post(`/api/v1/auth/forgot-password`, { role, col_email });
                if (res.data.success) {
                    toast.success(res.data.message);
                    localStorage.setItem("reset", JSON.stringify(res.data));
                    navigate("/otp");
                }
            }

        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong" + error);
        }
    }


    return (
        <Layout title={"Forgot Password"} >
            <div>

                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" id="logo">
                            <img src="/image/hogwart_school_logo.png" alt="University Logo" />
                        </a>
                        <h2>Forgot Password</h2>
                    </div>
                </nav>

                <div className="px-4 py-5 my-5 text-center">
                    <img src="/image/forgot_password.jpg" className="mb-3 reset" alt="Image of forgot password" style={{ width: 115 }} />
                    <div className="col-lg-6 mx-auto">

                        <form>
                            <div className="bd-example m-0 border-0">
                                <select className="form-select form-select-lg mb-3 " name="role" value={role}
                                    aria-label=".form-select-lg example" required autofocus
                                    onChange={(e) => setRole(e.target.value)}>
                                    <option value="Select your role in Hogwart School">Select your role in Hogwart School</option>
                                    <option value="Student">Student</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>


                            {
                                role === "Student" ?
                                    (<>
                                        <div className="bd-example m-0 border-0">
                                            <select className="form-select form-select-lg mb-3 " name="role" value={house}
                                                aria-label=".form-select-lg example" required autofocus
                                                onChange={(e) => setHouse(e.target.value)}>

                                                <option value="Select House of Student">Select House of Student</option>
                                                <option value="Gryffindor">Gryffindor</option>
                                                <option value="Ravenclaw">Ravenclaw</option>
                                                <option value="Hufflepuff">Hufflepuff</option>
                                                <option value="Slytherin">Slytherin</option>

                                            </select>
                                        </div>
                                    </>) :
                                    (<>

                                    </>)
                            }


                            <div className="form-floating mb-3">
                                <input type="email" name="email" value={col_email}
                                    className="form-control" id="floatingInput"
                                    placeholder="name@example.com" required
                                    onChange={(e) => setCol_email(e.target.value)} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleGetOTP} className="btn btn-primary btn-lg px-4 gap-3">Get OTP</button>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Forgot_Password;