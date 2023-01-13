import React, { useState } from 'react';
import './App.scss';

import {
  Button,
  Typography,
  Paper,
  TextField,
  Box,
  FormControl,
  MenuItem,
} from '@mui/material';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState([...preparedTodos]);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const reset = () => {
    setNewTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!newTitle);
    setUserError(!selectedUser);

    if (newTitle && selectedUser) {
      setTodos(prev => {
        const newTodo = {
          id: getNewId(prev),
          title: newTitle,
          userId: selectedUser,
          completed: false,
          user: getUserById(+selectedUser),
        };

        return [...prev, newTodo];
      });

      reset();
    }
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleSelectedUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <Paper className="container">
        <Typography variant="h3">Add todo form</Typography>

        <form
          action="/api/users"
          method="POST"
          className="App__form"
          onSubmit={handleSubmit}
        >
          <Box
            component="form"
          >
            <FormControl fullWidth>
              <TextField
                error={isTitleError}
                id="outlined-basic"
                label="Title: "
                variant="outlined"
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={newTitle}
                onChange={handleNewTitle}
                helperText={isTitleError && 'Please enter a title'}
                sx={{
                  marginBottom: 3,
                  marginTop: 3,
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                select
                error={isUserError}
                id="demo-simple-select"
                label="User: "
                data-cy="userSelect"
                value={selectedUser}
                onChange={handleSelectedUser}
                helperText={isUserError && 'Please choose a user'}
              >
                <MenuItem
                  value="0"
                  disabled
                  sx={{
                    color: 'grey',
                  }}
                >
                  <em>Choose a user</em>
                </MenuItem>
                {usersFromServer.map((user) => (
                  <MenuItem value={user.id} key={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            type="submit"
            color="success"
            data-cy="submitButton"
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
