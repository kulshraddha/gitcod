import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserForm from "./UserForm";
import { useContext } from "react";
import UserContext from "./UserContext";
const AddEditUser = ({ open }) => {
  const { handleclose, operation } = useContext(UserContext);
  return (
    <>
      <Dialog open={open} onClose={handleclose}>
        <DialogTitle>{operation == "edit" ? "Edit" : "Add"} user</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;
