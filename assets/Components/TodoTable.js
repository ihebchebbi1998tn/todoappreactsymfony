import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../Contexts/TodoContexts';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import {
  IconButton,
  Input,
  MenuItem,
  Select,
  TableCell,
  TextField,
} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteDialog from './DeleteDialog';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

function TodoTable() {
  const context = useContext(TodoContext);

  const [addTodo, setAddTodo] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addUser, setAddUser] = useState('');
  const [addRole, setAddRole] = useState('');
  const [addDate, setAddDate] = useState('');

  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editUser, setEditUser] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editDate, setEditDate] = useState('');

  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] =
    useState(false);
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          context.readTodo(searchQuery);
        }}
        style={{ marginBottom: '20px', marginTop: '20px' }}
      >
        <div align="center">
          <TextField
            label="Rechercher"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              context.readTodo(event.target.value); // Déclencher la recherche à mesure que vous tapez
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color={"primary"} type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          context.createTodo(event, {
            name: addTodo,
            description: addDescription,
            user: addUser,
            role: addRole,
            date: addDate,
          });
          setAddTodo('');
          setAddDescription('');
          setAddUser('');
          setAddRole('');
          setAddDate('');
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tâche</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Date</TableCell>
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
                  label="Nouvelle tâche"
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
                  label="Utilisateur"
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
                    inputProps={{ 'aria-label': 'Utilisateur' }}
                  >
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'User'}>Utilisateur</MenuItem>
                    <MenuItem value={'Guest'}>Invité</MenuItem>
                  </Select>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={addDate}
                  onChange={(event) => {
                    setAddDate(event.target.value);
                  }}
                  fullWidth={true}
                  label="Date"
                  color={"primary"}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color={"primary"} type="submit">
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {context.todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <TableRow key={'todo ' + index}>
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
                          inputProps={{ 'aria-label': 'Utilisateur' }}
                        >
                          <MenuItem value={'admin'}>admin</MenuItem>
                          <MenuItem value={'normal'}>normal</MenuItem>
                          <MenuItem value={'user'}>utilisateur</MenuItem>
                          <MenuItem value={'guest'}>invité</MenuItem>
                        </Select>
                      </div>
                    ) : (
                      todo.role
                    )}
                  </TableCell>
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <div>
                        <Input
                          type="date"
                          value={editDate}
                          onChange={(event) => {
                            setEditDate(event.target.value);
                          }}
                          fullWidth={true}
                          label="Date"
                        />
                      </div>
                    ) : (
                      todo.date
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIsShown === todo.id ? (
                      <div>
                        <IconButton color={"primary"}
                          onClick={() => {
                            context.updateTodo({
                              id: todo.id,
                              name: editTodo,
                              description: editDescription,
                              user: editUser,
                              role: editRole,
                              date: editDate,
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
                        <IconButton color={"primary"}
                          onClick={() => {
                            setEditIsShown(todo.id);
                            setEditTodo(todo.name);
                            setEditDescription(todo.description);
                            setEditUser(todo.user);
                            setEditRole(todo.role);
                            setEditDate(todo.date);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton color={"secondary"}
                          onClick={() => {
                            setDeleteConfirmationIsShown(true);
                            setTodoToBeDeleted(todo);
                          }}
                        >
                          <DeleteIcon primary />
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
