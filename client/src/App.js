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
import Course_Student_Details from './pages/Course_Student_Details';
import Update_Attendence from './pages/Update_Attendence';
import Update_Marks from './pages/Update_Marks';
import Student_courses from './pages/Student_courses';
import Attendance_Marks from './pages/Attendance_Marks';
import Event from './pages/Event';
import Add_New_Event from './pages/Add_New_Event';
import Delete_Event from './pages/Delete_Event';
import Event_Participate_Details from './pages/Event_Participate_Details';
import About_Us from './pages/About_Us';



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


        //student enroll course details private route only for professor
        <Route path='/course_student_details' element={<PrivateRoute_Professor />}>
          <Route path="" element={<Course_Student_Details />} />
        </Route>


        //updating attendence private route of Professor
        <Route path='/update_attendence' element={<PrivateRoute_Professor />}>
          <Route path="" element={<Update_Attendence />} />
        </Route>


        //updating marks private route of Professor
        <Route path='/update_marks' element={<PrivateRoute_Professor />}>
          <Route path="" element={<Update_Marks />} />
        </Route>

        //Student courses private route of student
        <Route path='/student_courses' element={<PrivateRoute_Student />}>
          <Route path="" element={<Student_courses />} />
        </Route>

        //Student course attendance & marks private route of student
        <Route path='/student_course_attendance_marks' element={<PrivateRoute_Student />}>
          <Route path="" element={<Attendance_Marks />} />
        </Route>


        // Page not found Route
        <Route path='/registration_closed' element={<Registration_Closed />} />


        //events routes
        <Route path='/event' element={<Event />} />

        //add new event only through admin
        <Route path='/add_new_event' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Add_New_Event />} />
        </Route>

        //delete evemt only through admin
        <Route path='/delete_event' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Delete_Event />} />
        </Route>

        //evemt participate details only through admin
        <Route path='/event_participate_details' element={<PrivateRoute_Admin />}>
          <Route path="" element={<Event_Participate_Details />} />
        </Route>

        // Page not found Route
        <Route path='*' element={<Pagenotfound />} />

        //About Page
        <Route path='/about' element={<About_Us />} />

      </Routes>
    </>
  );
}

export default App;
