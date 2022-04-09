import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import './App.scss';

function App() {

  console.log("Chieck");


  return (

    <Router>
      <Routes>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>

      </Routes>
    </Router>
    
  )
}

export default App;
