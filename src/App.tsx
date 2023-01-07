import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormControl, FormHelperText,
} from '@mui/material';
import cn from 'classnames';

import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todos } from './types/Todos';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleCorrect, setTitleCorrect] = useState(true);
  const [userIdCorrect, setUserIdCorrect] = useState(true);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleCorrect(true);
  };

  const changeUserId = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    setUserIdCorrect(true);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title) {
      setTitleCorrect(true);
    } else {
      setTitleCorrect(false);
    }

    if (userId) {
      setUserIdCorrect(true);
    } else {
      setUserIdCorrect(false);
    }

    if (userId && title) {
      const id = Math.max(...todos.map(todo => todo.id));

      const obj: Todos = {
        title,
        userId: +userId,
        completed: false,
        id: id + 1,
        user: getUserById(+userId),
      };

      setTodos(prev => [...prev, obj]);
      setTitle('');
      setUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="App__form"
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <TextField
            id="outlined-basic"
            placeholder="Enter a title"
            label="Title"
            variant="outlined"
            type="text"
            data-cy="titleInput"
            sx={{ m: 1, minWidth: 198 }}
            size="small"
            error={!titleCorrect}
            helperText={cn({ 'Please enter a title': !titleCorrect })}
            value={title}
            onChange={changeTitle}
          />
        </div>

        <div className="field">
          <FormControl
            sx={{ m: 1, minWidth: 198 }}
            size="small"
            error={!userIdCorrect}
          >
            <InputLabel id="select-label">User</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select"
              data-cy="userSelect"
              value={userId}
              label="User"
              onChange={changeUserId}
            >
              {usersFromServer.map(user => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
            {!userIdCorrect && (
              <FormHelperText>Please choose a user</FormHelperText>
            )}
          </FormControl>
        </div>

        <Button
          type="submit"
          data-cy="submitButton"
          size="small"
          variant="contained"
          style={{ margin: 10 }}
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
