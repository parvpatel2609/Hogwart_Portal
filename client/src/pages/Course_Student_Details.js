import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Course_Student_Details = () => {

  const [students, setStudents] = useState([]);

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


  //get all student who enroll in course
  const getStudentEnroll = async () => {
    try {
      const { user } = JSON.parse(localStorage.getItem("auth"));
      const col_email = user.col_email;

      const id = JSON.parse(localStorage.getItem("course_id"));

      const res = await axios.post("/api/v1/grade/get_student_details", { col_email, id });

      if (res.data) {
        console.log(res.data);
        setStudents(res.data.student_enroll);
        localStorage.removeItem("course_id");
      }


    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting student enroll details from database");
    }
  }

  useEffect(() => {
    getStudentEnroll();
  }, []);


  return (
    <Layout title={"Course Details"}>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">

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
                  <NavLink className="nav-link active" aria-current="page" to="/dashboard_professor">Dashboard</NavLink>
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

        <div className="container">
          <h2 className="pb-2 border-bottom" style={{ textAlign: 'center' }}> Enrolled Students Detail </h2>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email id</th>
              </tr>
            </thead>
            {students.map(stu => (
              <tbody>
                <tr>
                  <td>
                    {stu.name}
                  </td>
                  <td>
                    {stu.col_email}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>


      </div>
    </Layout>
  )
}

export default Course_Student_Details