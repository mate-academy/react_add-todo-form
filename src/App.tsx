import { FormEvent, useState } from 'react';
import './App.scss';
import {
  FormControl, InputLabel, MenuItem, Select,
  Button,
  TextField,
  Container,
  Box,
  // FormHelperText,
} from '@mui/material';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getTodosInfo } from './helpers/getTodosInfo';
import { removeByPattern } from './helpers/removeByPattern';

const todosInfo = getTodosInfo();

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [todos, setTodos] = useState(todosInfo);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorSelectedUser, setErrorSelectedUser] = useState('');

  const changeUser = (id: string) => {
    if (id !== '') {
      setErrorSelectedUser('');
    }

    setSelectedUser(id);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    if (newTitle !== '') {
      setErrorTitle('');
    }

    const pattern = /[@^#$/%^&*()_+-\\{}[\]]/g;
    const patternedTitle = removeByPattern(newTitle, pattern);

    setTitle(patternedTitle);
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUser('');
  };

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setErrorTitle(title ? '' : 'Please enter a title');
      setErrorSelectedUser(selectedUser ? '' : 'Please choose a user');

      return;
    }

    const userInfo = usersFromServer
      .find(user => user.id === +selectedUser);

    if (!userInfo) {
      throw new Error('User not found');
    }

    setTodos((prev) => {
      const maxId = Math.max(...prev.map(todo => todo.id));

      const newTodo = {
        id: maxId + 1,
        title,
        userId: userInfo.id,
        completed: false,
        user: userInfo,
      };

      return [...prev, newTodo];
    });

    clearForm();
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <h1>Add todo form</h1>

        <Box
          sx={{
            width: '50%',
            mb: 5,
          }}
        >
          <form
            onSubmit={handleSubmit}
          >

            <FormControl
              fullWidth
              error={errorTitle !== ''}
              size="small"
            >
              <TextField
                data-cy="titleInput"
                label="Enter title"
                onChange={changeTitle}
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={title}
                error={errorTitle !== ''}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="user-select-label">
                Choose user
              </InputLabel>
              <Select
                data-cy="userSelect"
                labelId="user-select-label"
                id="user-simple-select"
                sx={{ mb: 3 }}
                value={selectedUser}
                label="Choose user"
                onChange={(event) => changeUser(event.target.value)}
                error={errorSelectedUser !== ''}
              >
                {usersFromServer.map(user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                data-cy="submitButton"
                type="submit"
                color="success"
              >
                Add
              </Button>
            </Box>

          </form>
        </Box>
        <TodoList todos={todos} />
      </Container>
    </>
  );
};
