import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTP = () => {

    const [otp, setOtp] = useState("");

    const navigator = useNavigate();

    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        // console.log(otp);
        const res = await axios.post(`/api/v1/auth/compareOtp`, {otp});
        if(res.data.success == true){
            toast.success(res.data.message);
            navigator("/reset_password");
        }
        else{
            toast.error(res.data.message);
        }
    }

    return (
        <Layout title={"Reset Password OTP"}>
            <div>

                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" id="logo">
                            <img src="/image/hogwart_school_logo.png" alt="University Logo" />
                        </a>
                        <h2>Reset Password OTP</h2>
                    </div>
                </nav>

                <div className="px-4 py-5 my-5 text-center">
                    <img src="/image/forgot_password.jpg" className="mb-3 reset" alt="Image of forgot password" style={{ width: 115 }} />
                    <div className="col-lg-6 mx-auto">

                        <form>

                            <div className="form-floating mb-3">
                                <input type="password" name="password" value={otp}
                                    className="form-control" id="floatingPassword"
                                    placeholder="Password" required
                                    onChange={(e) => setOtp(e.target.value)} />
                                <label htmlFor="floatingPassword">Enter Otp</label>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleSubmitOtp} className="btn btn-primary btn-lg px-4 gap-3">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OTP;