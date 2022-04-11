import { Accordion, AccordionSummary, Avatar, Grid, Link, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";

import CustomButton from "../UI/Button";

export default function RegisterPage(props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const userLevel = ["student", "admin", "super admin"]
  let userSelected = 0;


  

  const handleRegister = (event) => {

    event.preventDefault(); // prevents screen from reloading, which is set to default

    const data = {
      username: username,
      email: email,
      password: password,
      userLevel: userLevel[userSelected]
    }


    console.log("Enter Response");
    console.log(data);
    
    axios
    .post("http://localhost:6000/api/register/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });



  }

  return (
    <Grid sx={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",        
        borderStyle: "solid",
        borderColor: "red"
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        {/* Harcoded bgcolor (Should be changed in the future) */}
        <Avatar sx={{ bgcolor: "#FE6B8B" }}>
          {/* <LockIcon /> */}
        </Avatar>
      </Grid>
  
      <Box
        component="form"
        onSubmit={handleRegister}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
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
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          defaultValue={email}
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Accordion>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          >
            <Typography> Select UserLevel </Typography>
          
          </AccordionSummary>

          <List>

            <ListItem disablePadding>
              <ListItemButton
              onClick={() => {userSelected = 0}}>
              <ListItemText>Student</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
              onClick={() => {userSelected = 1}}>
              <ListItemText>Admin</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
              onClick={() => {userSelected = 2}}>
              <ListItemText>Super Admin</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>

        </Accordion>

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={
            email === "" ||
            password === "" ||
            confirmPassword !== password
          
          }
          sx={{ mt: 3, mb: 3 }}
        > 
          Register
        </CustomButton>
        <Link
          href="/login"
          variant="body2"
        >
          {"Already have an account? Log in!"}
        </Link>
      </Box>
    </Box>
  </Grid>
  );
}
