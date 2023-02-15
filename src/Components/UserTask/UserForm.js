import React, { useState } from "react";
import { Grid, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import UserContext from "./UserContext";
import { useEffect } from "react";
const UserForm = () => {
  const { loadUsers, handleclose, operation, initialUser } =
    useContext(UserContext);
  const [users, setUsers] = useState({
    name: "",
    mobile: "",
    age: "",
    City: "",
    gender: "",
  });
  useEffect(() => {
    if (initialUser) setUsers({ ...users, ...initialUser });
  }, [initialUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    // setUsers(console.log("users:", users));
    if (users.name && users.mobile) {
      if (operation == "edit") {
        axios
          .put(`http://localhost:8080/users/${users.id}`, users)
          .then((response) => {
            alert("user updated...");
            loadUsers();
            handleclose();
          })
          .catch((err) => {
            console.log(err);
            alert("Could not update the user");
          });
      } else {
        axios
          .post("http://localhost:8080/users", users)
          .then((response) => {
            alert("user created..");
            loadUsers();
            handleclose();
          })
          .catch((err) => {
            console.log(err);
            alert("Could not created the user");
          });
      }
    }
  };
  return (
    <>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              name="name"
              type="text"
              value={users.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Mobile"
              fullWidth
              name="mobile"
              type="number"
              value={users.mobile}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              name="email"
              type="email"
              value={users.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Age"
              fullWidth
              name="age"
              type="number"
              value={users.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {operation == "edit" ? "update" : "create"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserForm;
