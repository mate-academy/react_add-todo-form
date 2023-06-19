import { FC, useState } from 'react';
import './App.scss';

import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  FormHelperText,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import { getUser } from './helpers/userUtils';
import { todosUsers } from './helpers/todoUtils';
import '@fontsource/roboto/700.css';

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosUsers);
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      setUserError('Please choose a user');
    }

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (!selectedUser || !title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      user: getUser(selectedUser),
      userId: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUser(0);
    setTitleError('');
    setUserError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const filteredInput = input.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');

    setTitle(filteredInput);
    setTitleError('');
  };

  const handleUserChange = (event: SelectChangeEvent<number>) => {
    setSelectedUser(Number(event.target.value));
    setUserError('');
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          gutterBottom
        >
          Add todo form
        </Typography>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <TextField
              type="text"
              label="Title"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
              error={Boolean(titleError)}
              helperText={titleError}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="user-select">User</InputLabel>
            <Select
              id="user-select"
              value={selectedUser}
              onChange={handleUserChange}
              inputProps={{ 'data-cy': 'userSelect' }}
              error={Boolean(userError)}
              input={<OutlinedInput label="User" />}
            >
              <MenuItem value={0} disabled>
                Choose a user
              </MenuItem>

              {usersFromServer.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>

            {Boolean(userError) && (
              <FormHelperText error>{userError}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            data-cy="submitButton"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              display: 'block',
              margin: '0 auto',
              marginTop: '20px',
              fontSize: '20px',
            }}
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </Container>
    </div>
  );
};
