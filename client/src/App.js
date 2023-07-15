import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Pagenotfound from './pages/Pagenotfound';
import Dashboard_Student from './pages/Dashboard_Student';
import Register from './pages/Register';
import Dashboard_Admin from './pages/Dashboard_Admin';
import Dashboard_Professor from './pages/Dashboard_Professor';
import { PrivateRoute_Student, PrivateRoute_Admin, PrivateRoute_Professor } from './components/Routes/Private';
import Forgot_Password from './pages/Forgot_Password';
import OTP from './pages/OTP';
import Reset_Password from './pages/Reset_Password';
import Course_Directory from './pages/Course_Directory';
import Add_New_Course from './pages/Add_New_Course';
import Delete_Course from './pages/Delete_Course';
import Registration_Time from './pages/Registration_Time';
import Registration_Closed from './pages/Registration_Closed';
import Course_Registration from './pages/Course_Registration';
import Professor_Courses from './pages/Professor_Courses';



function App() {
  return (
    <>
      <Routes>
        // login page route
        <Route path='/' element={<Login />} />

        // Student dashboard Protected Route
        <Route path='/dashboard_student' element={<PrivateRoute_Student />}>
          <Route path="" element={<Dashboard_Student />} />
        </Route>

        // Admin dashboard Protected Route
        <Route path='/dashboard_admin' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Dashboard_Admin />} />
        </Route>

        // Admin only can add new student, professor, and admin through this route
        <Route path='/register' element={<PrivateRoute_Admin />}>
          <Route path='' element={<Register />} />
        </Route>

        // Professor dashboard Protected Route
        <Route path='/dashboard_professor' element={<PrivateRoute_Professor />}>
          <Route path="" element={<Dashboard_Professor />} />
        </Route>


        //OTP page route
        <Route path='/otp' element={<OTP />} />


        //Route for reset password
        <Route path='/forgot_password' element={<Forgot_Password />} />


        //Route for reset password
        <Route path='/reset_password' element={<Reset_Password />} />




        //Course Directory
        <Route path='/course_directory' element={<Course_Directory />} />

        //add new course in course directorhy only by admin
        <Route path='/add_new_course' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Add_New_Course />} />
        </Route>


        //delete course in course directory only by admin
        <Route path='/delete_course' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Delete_Course />} />
        </Route>


        //registartion start and end time set only by admin
        <Route path='/set_registration_time' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Registration_Time />} />
        </Route>


        // Student course registration Protected Route
        <Route path='/course_registration' element={<PrivateRoute_Student />}>
          <Route path="" element={<Course_Registration />} />
        </Route>


        //professor courses private routes only for professor
        <Route path='/professor_courses' element={<PrivateRoute_Professor />}>
          <Route path="" element={<Professor_Courses />} />
        </Route>





        // Page not found Route
        <Route path='/registration_closed' element={<Registration_Closed />} />


        // Page not found Route
        <Route path='*' element={<Pagenotfound />} />

      </Routes>
    </>
  );
}

export default App;
