import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
// import schoool_names from "../../backend/routes/index.js"
import CustomButton from "../UI/Button";
// import router from "../../../backend/routes";
// const db = require('../config');
let x = 0;

export default function RegisterPage(props) {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentLevel, setCurrentLevel] = useState("Select UserLevel");

  const userLevel = ["student", "admin", "super admin"];
  let userSelected = 0;

  const [isSuperAdmin, setIsSuperAdmin] = useState(undefined)

  const [schoolName, setSchoolName] = useState("");
  const [schooLoc, setSchoolLoc] = useState();
  const [NumOfStudents, setNumOfStudents] = useState();
  
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(false)
  const getSchoolList = () => {
  setLoading(true)
  axios.get("http://localhost:5000/api/grabUnivNames/")
      .then((res) => {

        // schoolList =  JSON.stringify(res.data.msg)
        const namesArr = res.data.msg.map(user => user.school_name)
        setNames(namesArr)
        // return res.data.msg.map(user => user.school_name);
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      }).finally(() => setLoading(false))
  }

  const handleRegister = (event) => {
    event.preventDefault(); // prevents screen from reloading, which is set to default


    let data;
    
    if(isSuperAdmin){
      data = {
      email: email,
      password: password,
      userLevel: userLevel[userSelected],
      school_name: schoolName,
      num_students: NumOfStudents,
      location: schooLoc
      }
    }
    else{
      data = {
        email: email,
        password: password,
        userLevel: userLevel[userSelected],
        school_name: schoolName,
        }
    }

    console.log("Enter Response");
    console.log(data);

    axios
      .post("http://localhost:5000/api/register/", data)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      });
  };
    

  return (
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          {/* Harcoded bgcolor (Should be changed in the future) */}
          <Avatar sx={{ bgcolor: "#FE6B8B" }}>{/* <LockIcon /> */}</Avatar>
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

          <Accordion style={{ width: 200 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {currentLevel}
            </AccordionSummary>

            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setCurrentLevel("Student");
                    setIsSuperAdmin(false);
                    userSelected = 0;
                  }}
                >
                  <ListItemText>Student</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setCurrentLevel("Admin");
                    setIsSuperAdmin(false)
                    userSelected = 1;
                  }}
                >
                  <ListItemText>Admin</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setCurrentLevel("Super Admin");
                    setIsSuperAdmin(true);
                    userSelected = 2;
                  }}
                >
                  <ListItemText>Super Admin</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Accordion>

          {isSuperAdmin === undefined ?
          
          <div></div>
          
          :
          (isSuperAdmin ? (
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="School Name"
                label="School"
                type="tex"
                autoComplete="school name"
                onChange={(event) => setSchoolName(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="School Location"
                label="School Location"
                type="text"
                autoComplete="School Location"
                onChange={(event) => setSchoolLoc(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Number of Students"
                label="Number of Students"
                type="text"
                autoComplete="Number of Students"
                onChange={(event) => setNumOfStudents(event.target.value)}
              />
            </div>
          ) : (
            <div style={{margin: 10}}>
              <Autocomplete
                options={names}
                onOpen={() => getSchoolList()}
                loading={loading}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="School Name" />}
          />
            </div>
          ))}

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={
              email === "" || password === "" || confirmPassword !== password
            }
            sx={{ mt: 3, mb: 3 }}
          >
            Register
          </CustomButton>
          <Link href="/login" variant="body2">
            {"Already have an account? Log in!"}
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}
