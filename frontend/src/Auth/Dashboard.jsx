import {
  AppBar,
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

import { useState } from "react";
import EventCreateModal from "./EventCreateModal";
import axios from "axios";
// import { useNavigate } from "react-router";
// import CustomButton from "../UI/Button";

export default function Dashboard(props) {
  const [events, setEvents] = useState([]);

  const url = `http://localhost:5000/api`;

  // Connected to the server, retreieve table info and show

  axios
    .get(`${url}/getEvents/`)
    .then(
      (res) => {
        // const eventArr = res.data.msg.map(event => event)
        // setEvents(eventArr)
        console.log(res);
      },
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });

  let data = {};

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const columns = [
    { field: "id", label: "ID", minwidth: 100 },
    { field: "eventName", label: "Event eventName", minwidth: 100 },
    { field: "school", label: "School", minwidth: 100 },
    { field: "loc", label: "Location", minwidth: 100 },
    { field: "desc", label: "Description", minwidth: 100 },
    { field: "cat", label: "Category", minwidth: 100 },
    { field: "date", label: "Date", minwidth: 100 },
    { field: "time", label: "Time", minwidth: 100 },
    { field: "rate", label: "Rating", minwidth: 100 },
    { field: "number", label: "Contact Number", minwidth: 100 },
  ];

  const formatNumber = (number) => {
    let newNumber = number.match(/^(\w{3})(\w{3})(\w{4})$/);
    return `(${newNumber[1]}) ${newNumber[2]}-${newNumber[3]}`;
  };

  const rows = [
    {
      id: "1",
      eventName: "PingPong",
      school: "UCF",
      loc: "4000 Universtity Blvd",
      desc: "None",
      cat: "Public",
      date: "08/20/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
    {
      id: "2",
      eventName: "Culture Day",
      school: "USF",
      loc: "3120 Dave Cir",
      desc: "None",
      cat: "Public",
      date: "02/18/2021",
      time: "06:00",
      rate: "2",
      number: "321GETHELP",
    },
    {
      id: "3",
      eventName: "Blank at Bay",
      school: "UF",
      loc: "2348 Crasion Blvd",
      desc: "None",
      cat: "Public",
      date: "08/20/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
    {
      id: "4",
      eventName: "Hockey",
      school: "FSU",
      loc: "5000 Stance Ct",
      desc: "None",
      cat: "Public",
      date: "05/05/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
    {
      id: "5",
      eventName: "Basketball",
      school: "FAMU",
      loc: " 9119 Rattle St",
      desc: "None",
      cat: "Public",
      date: "09/15/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
    {
      id: "6",
      eventName: "Currency Trade",
      school: "FGCU",
      loc: "3880 Eagles Blvd",
      desc: "None",
      cat: "Private",
      date: "03/28/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
    {
      id: "7",
      eventName: "Graduation",
      school: "UCF",
      loc: "4000 Universtity Blvd",
      desc: "None",
      cat: "Public",
      date: "05/07/2022",
      time: "14:00",
      rate: "5",
      number: "321GETHELP",
    },
  ];

  return (
    <Box sx={{ flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <EventCreateModal modalOpen={modalOpen} handleClose={handleClose} />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Welcome
          </Typography>

          <Button variant="contained" onClick={handleOpen}>
            Create Event
          </Button>
        </Toolbar>
      </AppBar>
      <TableContainer
        component={Paper}
        sx={{
          width: "100vw",
          height: "100vh",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((col) => {
                    const value = row[col.field];
                    return (
                      <TableCell key={col.field} align={col.align}>
                        {col.field === "number" ? formatNumber(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
