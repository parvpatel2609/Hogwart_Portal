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
        <Route path='/otp' element={<OTP />}/>


        //Route for reset password
        <Route path='/forgot_password' element={<Forgot_Password />}/>


        //Route for reset password
        <Route path='/reset_password' element={<Reset_Password />}/>


        // Page not found Route
        <Route path='*' element={<Pagenotfound />} />

      </Routes>
    </>
  );
}

export default App;
