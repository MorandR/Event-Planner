import {
  AppBar,
  Box,
  Button,
  IconButton,
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
import { MenuIcon } from "@mui/icons-material";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import CustomButton from "../UI/Button";

export default function Dashboard(props) {
  const columns = [
    { field: "id", label: "ID", minwidth: 100 },
    { field: "name", label: "Event Name", minwidth: 100 },
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
      name: "PingPong",
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
      name: "Culture Day",
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
      name: "Blank at Bay",
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
      name: "Hockey",
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
      name: "Basketball",
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
      name: "Currency Trade",
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
      name: "Graduation",
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
          {/* <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Welcome
          </Typography>

          <Button variant="contained">Logout</Button>
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
