import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';



const Sign_in = () => {
    const [role, setRole] = useState("Select your role in Hogwart School");
    const [col_email, setCol_email] = useState("");
    const [password, setPassword] = useState("");
    const [house, setHouse] = useState("Select House of Student");

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password.length < 6) {
                toast.error("Please enter minimum 6 character password!");
                navigate('/');
            }
            if (role === "Select your role in Hogwart School") {
                toast.error("Please select your role in Hogwart School");
            }
            else {
                if (role === "Student") {
                    if (house === "Select House of Student") {
                        toast.error("Please Select House of Student");
                    }
                    else {
                        const res = await axios.post(`/api/v1/auth/login`,
                            { role, house, col_email, password });

                        if (res.data.success) {
                            toast.success(res.data.message);
                            setAuth({
                                ...auth,
                                user: res.data.user,
                                token: res.data.token
                            });
                            localStorage.setItem('auth', JSON.stringify(res.data));
                            navigate('/Dashboard_Student');
                        }
                        else {
                            toast.error(res.data.message);
                        }
                    }
                }

                if (role === "Admin") {
                    const res = await axios.post(`/api/v1/auth/login`,
                        { role, col_email, password });

                    if (res.data.success) {
                        toast.success(res.data.message);
                        // console.log("admin");
                        setAuth({
                            ...auth,
                            user: res.data.user,
                            token: res.data.token
                        });
                        localStorage.setItem('auth', JSON.stringify(res.data));
                        navigate('/Dashboard_Admin');
                    }
                    else {
                        toast.error(res.data.message);
                    }
                }

                if (role === "Professor") {
                    const res = await axios.post(`/api/v1/auth/login`,
                        { role, col_email, password });

                    if (res.data.success) {
                        toast.success(res.data.message);
                        // console.log("professor");
                        setAuth({
                            ...auth,
                            user: res.data.user,
                            token: res.data.token
                        });
                        localStorage.setItem('auth', JSON.stringify(res.data));
                        navigate('/Dashboard_Professor');
                    }
                    else {
                        toast.error(res.data.message);
                    }
                }

            }

        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        }
    }



    return (
        <Layout title={"Login-Hogwart Portal"}>

            <div className="px-4 py-5 my-5 text-center">

                <img src="/image/hogwart_school.jpg" className="mb-3 sign" alt="Hogwart School" style={{ height: "50vh" }} />

                <div className="col-lg-6 mx-auto">

                    <form>

                        <div className="bd-example m-0 border-0">
                            <select className="form-select form-select-lg mb-3 " name="role" value={role}
                                aria-label=".form-select-lg example" required autofocus
                                onChange={(e) => setRole(e.target.value)}>

                                <option value="Select your role in Hogwart School">Select your role in Hogwart School </option>
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
                            <input type="email" name="email" className="form-control" value={col_email}
                                id="floatingInput" placeholder="name@example.com" required
                                onChange={(e) => setCol_email(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" name="password" className="form-control" value={password}
                                id="floatingPassword" placeholder="Password" required
                                onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="col-auto mt-3">
                            <span id="passwordHelpInline" className="form-text">
                                Password must be in 8-20 characters long.
                            </span>
                        </div>

                        <NavLink to="/forgot_password" className="icon-link m-3">Forgot Password </NavLink>

                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button onClick={handleSubmit} className="btn btn-primary btn-lg px-4 gap-3">Sign in</button>
                        </div>

                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default Sign_in;