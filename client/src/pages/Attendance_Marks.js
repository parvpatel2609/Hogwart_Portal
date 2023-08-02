import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Attendance_Marks = () => {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [studentPerformence, setstudentPerformence] = useState({ courseName: "", marks: "", attendance: "" });

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

  const getAttendance_Marks = async () => {
    try {
      const { user } = JSON.parse(localStorage.getItem("auth"));
      const id = user._id;

      const course_id = JSON.parse(localStorage.getItem("stu_course_id"));

      const res = await axios.post("/api/v1/grade/get_student_attendance_marks", { id, course_id });

      if (res.data) {
        // console.log(res.data.attendance_marks);
        setstudentPerformence({
          courseName: res.data.attendance_marks.course_id.course_name,
          marks: res.data.attendance_marks.students_enroll[0].marks,
          attendance: res.data.attendance_marks.students_enroll[0].Attendence
        });
      }
    }
    catch (error) {
      // console.log(error);
      toast.error("Something went wrong in getting student attendance & marks of course");
    }
  }

  useEffect(() => {
    getAttendance_Marks();
  }, []);


  return (
    <Layout title={"Student Attendance & Marks"}>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">

          <div className="container-fluid" id="mynavbar">
            <NavLink className="navbar-brand" id="logo" to="/">
              <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
            </NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard_student">Dashboard</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/event">Event</NavLink>
                </li>
              </ul>

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

        <video src="/image/Hogwart_tour.mkv" autoPlay loop muted>Hogwart Tour</video>.

        <div className="container px-4 py-5" id="featured-3">
          <h2 className="pb-2 border-bottom">{studentPerformence.courseName}</h2>
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">

            <div className="feature col">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <img className="feature_au" src="image/Attendance.png" alt="Course Directry" />
              </div>
              <h3 className="fs-2 text-body-emphasis">Attendance: {studentPerformence.attendance}</h3>
              <p>If you have query related attendance, then contact to this course's professor</p>
            </div>

            <div className="feature col">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <img className="feature_au" src="image/Marks.png" alt="Course Directry" />
              </div>
              <h3 className="fs-2 text-body-emphasis">Marks: {studentPerformence.marks}</h3>
              <p>If you have query related marks, then contact to this course's professor</p>
            </div>
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

export default Attendance_Marks;