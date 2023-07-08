import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Invalid_password from './pages/Invalid_password';
import Pagenotfound from './pages/Pagenotfound';
import Dashboard_Student from './pages/Dashboard_Student';
import Register from './pages/Register';
import Dashboard_Admin from './pages/Dashboard_Admin';
import Dashboard_Professor from './pages/Dashboard_Professor';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/invalid_password' element={<Invalid_password />} />
        <Route path='/dashboard_student' element={<Dashboard_Student />} />
        <Route path='/dashboard_admin' element={<Dashboard_Admin />} />
        <Route path='/dashboard_professor' element={<Dashboard_Professor />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
