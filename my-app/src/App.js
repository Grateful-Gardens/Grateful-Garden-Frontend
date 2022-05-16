import './App.css'
import Home from './pages/home/Home.jsx'
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
// import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
