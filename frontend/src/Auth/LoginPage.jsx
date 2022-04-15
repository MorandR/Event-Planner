import {
  Avatar,
  bottomNavigationClasses,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
// import LockIcon from "@mui/icons-material/Lock";

import { useState } from "react";
import CustomButton from "../UI/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthPage from "./AuthPage";


export default function LoginPage(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState("");

  const navigate = useNavigate();


  const url = "http://localhost:5000/api";
  const handleLogin = (event) => {
    event.preventDefault(); // prevents screen from reloading, which is set to default

    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${url}/login/`, data)
      .then((res) => {
        // if error.
        if (res.data.error)
          alert(res.data.error)
        
        // for now just storing token in session storage since this app wont be online.
        sessionStorage.setItem("accessToken", res.data.token);
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      });
  };

  return (
<div>
<AuthPage/>
    <Grid
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    

      <Box
        sx={{
          flexDirection: "row",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "black",
          width: 300,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}></Avatar>
        </Grid>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            sx={{ borderRadius: 100 }}
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            defaultValue={props.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Grid container justifyContent="space-between">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={props.remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
          </Grid>
          <CustomButton
            loading={props.loading}
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.email === "" || props.password === ""}
            sx={{ mt: 3, mb: 3 }}
          >
            Sign In
          </CustomButton>
          <Link
            href="/register"
            variant="body2"
            onClick={() => {
             navigate("/register");
            }}
          >
            {"Don't have an account yet? Create one!"}
          </Link>
        </Box>
      </Box>
    </Grid>
    </div>
  );
}
