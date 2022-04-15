import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {AppBar, Typography} from "@mui/material";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const style={
  width: "100vw",
  height: "30vh",
  backgroundColor: "black",
  justifyContent: "center",
}
export default function AuthPage() {
  // const navigate = useNavigate();

  // // Handles the state of which box is displayed, default is "login". Options are: "login", "register" and "nopass"
  // const [currentBox, setCurrentBox] = useState("login");
  

  // // State handling for the box components
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);

  return (
        <AppBar sx={{width:"100%", height:"10%", backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
          <Typography sx={{fontSize: 30}}>EVENT PLANNER</Typography>
        </AppBar>
  );
}