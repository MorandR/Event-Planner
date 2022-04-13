import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import CustomButton from "../UI/Button";

export default function Dashboard(props) {
  const columns = [
    { field: "name", label: "Event Name", minwidth: 100 },
    { field: "school", label: "School", minwidth: 100 },
    { field: "loc", label: "Location", minwidth: 100 },
    { field: "desc", label: "Description", minwidth: 100 },
    { field: "cat", label: "Category", minwidth: 100 },
    { field: "date", label: "Date", minwidth: 100 },
    { field: "time", label: "Time", minwidth: 100 },
    { field: "rate", label: "Rating", minwidth: 100 },
    { field: "number", label: "Contact Number", minwidth: 100, format:(value) => value.toLocaleString('en-US')},
  ];


  const formatNumber = (number) =>{
    number.match('/(\w{3})(\w{3})(\w{4})/g')
    return `(${number[0]}) ${number[1]}-${number[2]}`;
  }


  const rows = [
    {name: "PingPong", school:"UCF", loc: "4000 Universtity Blvd", desc: 'None', cat: "Public", date: "08/20/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
    {name: "Culture Day", school:"USF", loc: "3120 Dave Cir", desc: 'None', cat: "Public", date: "02/18/2021", time: "06:00", rate: '2', number: formatNumber('321gethelp')},
    {name: "Blank at Bay", school:"UF", loc: "2348 Crasion Blvd", desc: 'None', cat: "Public", date: "08/20/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
    {name: "Hockey", school:"FSU", loc: "5000 Stance Ct", desc: 'None', cat: "Public", date: "05/05/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
    {name: "Basketball", school:"FAMU", loc: " 9119 Rattle St", desc: 'None', cat: "Public", date: "09/15/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
    {name: "Currency Trade", school:"FGCU", loc: "3880 Eagles Blvd", desc: 'None', cat: "Private", date: "03/28/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
    {name: "Graduation", school:"UCF", loc: "4000 Universtity Blvd", desc: 'None', cat: "Public", date: "05/07/2022", time: "14:00", rate: '5', number: formatNumber('321gethelp')},
  ];

  return (


    <TableContainer component={Paper}>
      <Table
        sx={{ width: "80% vw", height: "90% vh" }}
        aria-label="simple table"
      >
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
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((col) => {
                      const value = row[col.field];
                      return (
                        <TableCell key={col.field} align={col.align}>
                          {col.format ? col.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
