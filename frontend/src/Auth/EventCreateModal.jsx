import { Box, Modal, TextField, Typography } from "@mui/material";

import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

const url = `http://localhost:5000/api`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  padding: 10,
  boxShadow: 24,
  p: 4,
};

export default function EventCreateModal({ modalOpen, handleClose }) {
  const [date, setDate] = useState("");
  const [desc, setDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [loc, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [rate, setRating] = useState("");
  const [time, setTime] = useState("");
  const [cat, setCategory] = useState("");
  const [school, setSchool] = useState("")

  const createEvent = () => {
    axios
      .post(`${url}/createEvent/`, {
        date: date,
        description: desc,
        event_name: eventName,
        location: loc,
        phone: number,
        rating: rate,
        time: time,
        typeof_event: cat,
      })
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  return (
    <Modal open={modalOpen} onBackdropClick={handleClose} onClose={handleClose}>
      <Box style={style}>

        <Typography variant="h6"> Create an Event </Typography>

        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="Event Name"
          name="eventName"
          autoComplete="Event Name"
          type="name"
          onChange={(event) => setEventName(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="School"
          name="school"
          autoComplete="School Name"
          type="schoolName"
          onChange={(event) => setSchool(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="Location"
          name="location"
          autoComplete="Location"
          type="location"
          onChange={(event) => setLocation(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="Description"
          name="description"
          autoComplete="Description"
          type="desc"
          onChange={(event) => setDescription(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="Category"
          name="category"
          autoComplete="Category"
          type="cat"
          onChange={(event) => setCategory(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label=""
          name="date"
          autoComplete=""
          type="date"
          onChange={(event) => setDate(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label=""
          name="Time"
          autoComplete=""
          type="time"
          onChange={(event) => setTime(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="Rating"
          name="rating"
          autoComplete="Rating"
          type="rate"
          onChange={(event) => setRating(event.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          sx={{ borderRadius: 100 }}
          required
          fullWidth
          label="number"
          name="number"
          autoComplete="Contact Number"
          type="number"
          onChange={(event) => setNumber(event.target.value)}
          autoFocus
        />
      </Box>
    </Modal>
  );
}