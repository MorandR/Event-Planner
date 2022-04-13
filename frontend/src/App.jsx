import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import './App.scss';
import Dashboard from "./Auth/Dashboard";

export default function App() {

  return (

    <Router>
      <Routes>
         {/* <Route path="/dashboard" element={<Dashboard />}/> */}
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/" element={<LoginPage />}/>

      </Routes>
    </Router>
    
  )
}
