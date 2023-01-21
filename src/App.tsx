import React, { FC, useState } from 'react';
import './App.scss';

import {
  TextField, Box, MenuItem, Button, Typography, Paper,
} from '@mui/material';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

const startTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState<Todo[]>(startTodos);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setSelectedUser('');
  };

  const getMaxId = (): number => {
    const todosIds = todos.map(todo => todo.id);
    const largestId = Math.max(...todosIds);

    return largestId;
  };

  const getIdByUsername = (userName: string): number | null => (
    usersFromServer.find(user => user.name === userName)?.id || null
  );

  const getUserByUsername = (userName: string): User | null => {
    return usersFromServer.find(
      user => user.name === userName,
    ) || null;
  };

  const handleAdding = () => {
    const todoToAdd = {
      id: getMaxId() + 1,
      userId: getIdByUsername(selectedUser),
      title,
      completed: false,
      user: getUserByUsername(selectedUser),
    };

    setTodos((prev) => ([...prev, todoToAdd]));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setIsTitleError(true);
    }

    if (selectedUser === '') {
      setIsUserError(true);
    }

    if (title && selectedUser) {
      handleAdding();
      clearForm();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          width: '300px',
          padding: '20px 32px',
          margin: '32px 0',
        }}
        elevation={4}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          marginBottom={5}
        >
          Add todo form
        </Typography>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              mb: 2,
            }}
          >
            <TextField
              label="Title:"
              name="title"
              fullWidth
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsTitleError(false);
              }}
              error={isTitleError}
              helperText={
                isTitleError
                  ? 'Please enter a title'
                  : 'Enter a title'
              }
              type="text"
              size="small"
              color="secondary"
            />
          </Box>

          <Box
            sx={{
              mb: 2,
            }}
          >
            <TextField
              label="User:"
              name="user"
              select
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setIsUserError(false);
              }}
              fullWidth
              size="small"
              color="secondary"
              error={isUserError}
              helperText={
                isUserError
                  ? 'Please choose a user'
                  : 'Choose a user'
              }
            >
              <MenuItem value="" disabled>
                Choose a user
              </MenuItem>

              {usersFromServer.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Add
            </Button>
          </Box>
        </form>

        <TodoList todos={todos} />
      </Paper>
    </Box>
  );
};
