import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';



const Professor_Courses = () => {

  const [course, setCourse] = useState([]);

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
    localStorage.removeItem('course_id');
    navigate('/');
    toast.success("Logout Succefully");
  }


  //getting professor teaching courses 
  const getProfessorTeachingCourses = async () => {
    try {
      const { user } = JSON.parse(localStorage.getItem("auth"));
      const col_email = user.col_email;

      const res = await axios.post("/api/v1/grade/professor_courses", { col_email });
      // console.log(res);
      if (res) {
        // console.log(res.data);
        setCourse(res.data.course);
      }

    }
    catch (error) {
      // console.log(error);
      toast.error("Something went wrong for getting professor courses");
    }

  }

  useEffect(() => {
    getProfessorTeachingCourses();
  }, []);



  //more details button of particilar 
  const handleMoreDetails = async (id) => {
    try {
      // console.log(id);
      const { user } = JSON.parse(localStorage.getItem("auth"));
      const col_email = user.col_email;
      localStorage.setItem('course_id', JSON.stringify(id));
      // console.log(col_email);


      const res = await axios.post("/api/v1/grade/enroll_student", { col_email, id });

      if (res.data.success) {
        // console.log(res.data.stu_enroll);
        toast.success(res.data.message);
        navigate("/course_student_details");
      }

      else {
        toast.error(res.data.message);
      }
    }
    catch (error) {
      // console.log(error);
      toast.error(`Something went wrong ${error}`);
    }
  }


  return (
    <Layout title={"Professor Courses-Hogwart Portal"}>

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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/dashboard_professor">Dashboard</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/event">Event</NavLink>
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

        <video src="/image/Hogwart_tour.mkv" autoPlay loop muted>Hogwart Tour</video>


        <div className="container px-4 py-5" id="featured-3">
          <h2 className="pb-2 border-bottom">Quick Links</h2>

          <div className="row g-4">
            {course.map(co => (
              <div className="col-sm-6 col-lg-4">
                {/* Card Start */}
                <div className="card card-body shadow p-4 h-100">
                  <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4"><i className="bi bi-lightning-fill fs-5" /></div>
                  <h5> {co.course_name} </h5>
                  <h6> Credit: {co.credit}  </h6>
                  <h6> Faculty: {co.faculty} </h6>
                  <p> {co.description} </p>
                  <button onClick={() => { handleMoreDetails(co._id) }} style={{ width: "fit-content" }} class="btn btn-primary">More Details</button>
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

export default Professor_Courses;