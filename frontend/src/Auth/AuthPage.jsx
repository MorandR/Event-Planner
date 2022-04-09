import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function AuthPage() {
  const navigate = useNavigate();

  // Handles the state of which box is displayed, default is "login". Options are: "login", "register" and "nopass"
  const [currentBox, setCurrentBox] = useState("login");
  

  // State handling for the box components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            height: "100vh",
            width: "100vw",
              overflowY: "hidden",
          }}
        >
          <Card
            sx={{
              padding: 3,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
              borderRadius: 5,
              width: "70%",
              maxWidth: "400px",
            }}
          >
            {
            
            (currentBox === "login")
            ? 
            (
              <LoginBox
                setCurrentBox={setCurrentBox}
                handleSubmit={handleLogin}
                setEmail={setEmail}
                setPassword={setPassword}
                setRemember={setRemember}
                email={email}
                password={password}
                remember={remember}
                loading={loading}
              />
            ) 
            
            : 
              <RegisterBox
                setCurrentBox={setCurrentBox}
                handleSubmit={handleRegister}
                setEmail={setEmail}
                setPassword={setPassword}
                setRemember={setRemember}
                email={email}
                password={password}
                loading={loading}
                /> 
        }
          </Card>
        </Grid>
  );
}