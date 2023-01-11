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
import './App.scss';

import cn from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
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

      const newTodo: Todos = {
        title,
        userId: +userId,
        completed: false,
        id: id + 1,
        user: getUserById(+userId),
      };

      setTodos(prev => [...prev, newTodo]);
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
            type="text"
            id="outlined-basic"
            data-cy="titleInput"
            variant="outlined"
            size="medium"
            value={title}
            onChange={changeTitle}
            label="Title"
            sx={{ m: 1, minWidth: 198 }}
            error={!titleCorrect}
            helperText={cn({ 'Please enter a title': !titleCorrect })}
            placeholder="Enter a title"
          />
        </div>

        <div className="field">
          <FormControl
            size="medium"
            sx={{ m: 1, minWidth: 198 }}
            error={!userIdCorrect}
          >
            <InputLabel id="select-label">User</InputLabel>
            <Select
              id="demo-simple-select"
              data-cy="userSelect"
              value={userId}
              onChange={changeUserId}
              labelId="select-label"
              label="User"
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
          variant="outlined"
          size="large"
          style={{ margin: 8 }}
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
