import React, { useEffect, useState } from "react";
import MuiDatatable from "mui-datatables";
import axios from "axios";
import AddEditUser from "./AddEditUser";
import { Button } from "@mui/material";
import UserContext from "./UserContext";
import Swal from "sweetalert2";
const UserList = () => {
  const [user, setUser] = useState([]);
  const [deleteUsers, setDeleteUsers] = useState({});
  const [operation, setOperation] = useState("add");
  const [openDialog, setOpenDialog] = useState(false);
  const [initialUser, setInitialUser] = useState({});

  const handleclose = () => {
    setOpenDialog(false);
  };

  const loadUsers = () => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const editUser = (user) => {
    setOpenDialog(true);
    setOperation("edit");
    setInitialUser(user);
  };
  const AddEdit = () => {
    setOpenDialog(true);
    setOperation("add");
  };
  const handleDeleteList = (id) => {
    var du = user.filter((val) => val.id == id);
    setUser(du);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/users/${id}`)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Deleted!", "Your file has not been deleted.", "error");
          });
      }
    });
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const u = user[index];

          return (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editUser(u)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <UserContext.Provider
        value={{ loadUsers, handleclose, operation, initialUser }}
      >
        <AddEditUser open={openDialog} handleClose={handleclose} />
      </UserContext.Provider>
      <Button variant="contained" onClick={AddEdit}>
        New+
      </Button>
      <Button variant="contained" onClick={() => handleDeleteList(user.id)}>
        DeleteList
      </Button>
      <MuiDatatable title="userList" data={user} columns={columns} />
    </>
  );
};

export default UserList;
