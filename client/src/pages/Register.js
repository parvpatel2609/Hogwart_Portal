import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import getRandomString from '../randomString';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");
  const [per_email, setPer_email] = useState("");
  const [number, setNumber] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [col_email, setCol_email] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //form submit button function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      if (password.length < 6) {
        toast.error("Please enter minimum 6 character password!");
        navigate('/register');
      }
      else {
        if (role === "Student") {
          const house = getRandomString();
          // console.log(house);
          const res = await axios.post(`/api/v1/auth/register`,
            { role, house, name, per_email, number, birth_date, col_email, password });

          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/dashboard_admin');
          }
          else {
            toast.error(res.data.message);
          }
        }

        if (role === "Admin") {
          const res = await axios.post(`/api/v1/auth/register`,
          { role, name, per_email, number, birth_date, col_email, password });

          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/dashboard_admin');
          }
          else {
            toast.error(res.data.message);
          }
        }

        if (role === "Professor") {
          const res = await axios.post(`/api/v1/auth/register`,
          { role, name, per_email, number, birth_date, col_email, password });

          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/dashboard_admin');
          }
          else {
            toast.error(res.data.message);
          }
        }

      }

    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong for new reister")
    }
  }


  return (
    <Layout title={"Register - Hogwart Portal"}>
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
                <select className="form-select form-select-lg mb-3" value={role}
                  name="role" aria-label=".form-select-lg example"
                  onChange={(e) => setRole(e.target.value)}>
                  <option value="Student">Student</option>
                  <option value="Professor">Professor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="form-floating mb-3">
                <input type="text" name="name" value={name}
                  className="form-control" id="floatingInput"
                  placeholder="Enter your name" required
                  onChange={(e) => setName(e.target.value)} />
                <label htmlFor="floatingInput">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" name="per_email" value={per_email}
                  className="form-control" id="floatingInput"
                  placeholder="Enter personal email" required
                  onChange={(e) => setPer_email(e.target.value)} />
                <label htmlFor="floatingInput">Personal Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" name="mobile_number" value={number}
                  className="form-control" id="floatingInput"
                  placeholder="Enter mobile number" required
                  onChange={(e) => setNumber(e.target.value)} />
                <label htmlFor="floatingInput">Mobile Number</label>
              </div>

              <div className="form-floating mb-3">
                <input type="date" name="birthday" value={birth_date}
                  className="form-control" id="floatingInput"
                  placeholder="yyyy-mm-dd" required
                  onChange={(e) => setBirth_date(e.target.value)} />
                <label htmlFor="floatingInput">Date of Birth</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" name="col_email" value={col_email}
                  className="form-control" id="floatingInput"
                  placeholder="Enter new college email id" required
                  onChange={(e) => setCol_email(e.target.value)} />
                <label htmlFor="floatingInput">New College Email address</label>
              </div>

              <div className="form-floating">
                <input type="password" name="password" value={password}
                  className="form-control" id="floatingPassword"
                  placeholder="Enter your Password" required
                  onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="col-auto mb-3">
                <span id="passwordHelpInline" className="form-text">
                  Password must be 8-20 characters long.
                </span>
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

export default Register