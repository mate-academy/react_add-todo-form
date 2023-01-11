import React, { useState } from 'react';
import './App.scss';
import ClearIcon from '@mui/icons-material/Clear';
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from '@mui/material';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [showTitleError, setTitleError] = useState(false);
  const [showUserError, setUserError] = useState(false);

  const getNewId = (array: { id: number }[]) => (
    Math.max(...array.map(el => el.id)) + 1
  );

  const reset = () => {
    setNewTitle('');
    setNewUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = () => {
    if (!newTitle) {
      setTitleError(true);
    }

    if (!newUserId) {
      setUserError(true);
    }

    if (newTitle && newUserId) {
      setTodos(prev => {
        const newTodo = {
          id: getNewId(prev),
          title: newTitle,
          completed: false,
          userId: newUserId,
          user: getUserById(newUserId),
        };

        return [...prev, newTodo];
      });

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <TextField
            sx={{ m: 2, width: '250px' }}
            data-cy="titleInput"
            label="Title"
            placeholder="Enter a title"
            helperText={showTitleError ? 'Please enter a title' : ''}
            error={showTitleError}
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
              setTitleError(false);
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setNewTitle('')}
                  sx={{ visibility: newTitle ? 'visible' : 'hidden' }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <div className="field">
          <FormControl error={showUserError} sx={{ m: 2, width: '250px' }}>
            <InputLabel id="select-label">User</InputLabel>
            <Select
              data-cy="userSelect"
              id="demo-simple-select"
              value={newUserId}
              onChange={event => {
                setNewUserId(+event.target.value);
                setUserError(false);
              }}
              labelId="select-label"
              label="User"
            >
              <MenuItem value="0" disabled>Choose a user</MenuItem>
              {usersFromServer.map(user => (
                <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>
              ))}
            </Select>

            {showUserError && (
              <FormHelperText>Please choose a user</FormHelperText>
            )}
          </FormControl>
        </div>

        <Button
          type="submit"
          size="large"
          data-cy="submitButton"
          variant="contained"
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
