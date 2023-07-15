import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Delete_Course = () => {

  const [course, setCourse] = useState([]);
  const [auth, setAuth] = useState("");

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

  //get all courses
  const getCourse = async () => {
    try {
      const { data } = await axios.get("/api/v1/course/courser_directory");
      if (data.success) {
        setCourse(data.course);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all course details");
    }
  };

  useEffect(() => {
    getCourse();
  }, []);


  //get auth details
  const getAuth = async () => {
    try {
      const { user } = JSON.parse(localStorage.getItem("auth"));
      if (user.role === "Admin") {
        setAuth("Admin");
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAuth();
  }, []);



  //delete course 
  const handleDeleteCourse = async(id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/api/v1/course/delete_course/${id}`);
      console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
        window.location.reload();
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(`Something went wrong + ${error}`);
    }
  }



  return (
    <Layout title={"Delete Course-Hogwart Portal"}>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" id="logo" to="/">
              <img src="/image/hogwart_school_logo.png" alt="Hogwart School Logo" />
            </NavLink>
          </div>
        </nav>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-light btn-outline-danger">Logout</button>
            </li>
          </ul>
        </div>


        <div className="container">

          <div className="row mb-3 mb-sm-4 ">
            <div className="col-12 text-center mt-3">
              <h2>Course Directory</h2>
            </div>
          </div>

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
                  <p style={{ display: "none" }}> {co._id} </p>
                  <button onClick={() => {handleDeleteCourse(co._id)}} style={{ width: "fit-content" }} class="btn btn-primary">Delete Course</button>
                </div>
                {/* Card END */}
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Delete_Course;