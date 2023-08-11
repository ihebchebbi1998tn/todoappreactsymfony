import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../Contexts/TodoContexts";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { IconButton, MenuItem, Select, TableCell, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteDialog from "./DeleteDialog";


function TodoTable() {
  const context = useContext(TodoContext);

  const [addTodo, setAddTodo] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addUser, setAddUser] = useState("");
  const [addRole, setAddRole] = useState("");

  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editUser, setEditUser] = useState("");
  const [editRole, setEditRole] = useState("");

  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] =
    useState(false);
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          context.createTodo(event, {
            name: addTodo,
            description: addDescription,
            user: addUser,
            role: addRole,
          });
          setAddTodo("");
          setAddDescription("");
          setAddUser("");
          setAddRole("");
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <TextField
                  value={addTodo}
                  onChange={(event) => {
                    setAddTodo(event.target.value);
                  }}
                  fullWidth={true}
                  label="New Task"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  value={addDescription}
                  onChange={(event) => {
                    setAddDescription(event.target.value);
                  }}
                  fullWidth={true}
                  label="Description"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  value={addUser}
                  onChange={(event) => {
                    setAddUser(event.target.value);
                  }}
                  fullWidth={true}
                  label="User"
                />
              </TableCell>
              <TableCell>
                <div>
                  <Select
                    value={addRole}
                    onChange={(event) => {
                      setAddRole(event.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "User" }}
                  >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"Guest"}>Guest</MenuItem>
                  </Select>
                </div>
              </TableCell>
              <TableCell align="right">
                <IconButton type="submit">
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {context.todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <TableRow key={"todo " + index}>
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <TextField
                        fullWidth={true}
                        value={editTodo}
                        onChange={(event) => {
                          setEditTodo(event.target.value);
                        }}
                      />
                    ) : (
                      todo.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <TextField
                        fullWidth={true}
                        value={editDescription}
                        onChange={(event) => {
                          setEditDescription(event.target.value);
                        }}
                      />
                    ) : (
                      todo.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <TextField
                        fullWidth={true}
                        value={editUser}
                        onChange={(event) => {
                          setEditUser(event.target.value);
                        }}
                      />
                    ) : (
                      todo.user
                    )}
                  </TableCell>
                  <TableCell>
                  {editIsShown === todo.id ? (
                    <div>
                      <Select
                        value={editRole}
                        onChange={(event) => {
                          setEditRole(event.target.value);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "User" }}
                      >
                        
                        <MenuItem value={"admin"}>admin</MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                        <MenuItem value={"user"}>user</MenuItem>
                        <MenuItem value={"guest"}>guest</MenuItem>
                      </Select>
                    </div>
                    ) : (
                      todo.role
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIsShown === todo.id ? (
                      <div>
                        <IconButton
                          onClick={() => {
                            context.updateTodo({
                              id: todo.id,
                              name: editTodo,
                              description: editDescription,
                              user: editUser,
                            });
                            setEditIsShown(false);
                          }}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEditIsShown(false);
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <Fragment>
                        <IconButton
                          onClick={() => {
                            setEditIsShown(todo.id);
                            setEditTodo(todo.name);
                            setEditDescription(todo.description);
                            setEditUser(todo.user);
                            setEditRole(todo.role);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setDeleteConfirmationIsShown(true);
                            setTodoToBeDeleted(todo);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Fragment>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>
      {deleteConfirmationIsShown && (
        <DeleteDialog
          todo={todoToBeDeleted}
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
        />
      )}
    </Fragment>
  );
}

export default TodoTable;
