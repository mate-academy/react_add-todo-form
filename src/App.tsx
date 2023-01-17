import './App.scss';
import {
  Button,
  Paper,
  FormControl,
  TextField,
  MenuItem,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosWithUsers);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserNotSelected, setIsUserNotSelected] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const changeUser = (event: SelectChangeEvent<number>) => {
    setUserId(+event.target.value);
    setIsUserNotSelected(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleEmpty(!title.trim());
    setIsUserNotSelected(!userId);

    if (userId && title.trim()) {
      setTitle('');
      setUserId(0);

      const id = Math.max(...todos.map(todo => todo.id));

      const newTodo = {
        title,
        userId: +userId,
        completed: false,
        id: id + 1,
        user: getUserById(+userId),
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
    }

    setIsTitleEmpty(!title.trim());
    setIsUserNotSelected(!userId);
  };

  return (
    <Paper
      className="Paper"
      sx={{
        margin: '0 auto',
        width: 'max-content',
      }}
      elevation={23}
    >
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="Form"
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <FormControl fullWidth>
              <label htmlFor="title">
                {'Title: '}
              </label>

              <TextField
                id="title"
                type="text"
                data-cy="titleInput"
                value={title}
                onChange={changeTitle}
                placeholder="Enter a title"
              />
            </FormControl>
            {isTitleEmpty
            && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <label htmlFor="username">
              {'User: '}
            </label>
            <FormControl fullWidth>
              <Select
                data-cy="userSelect"
                value={userId}
                onChange={changeUser}
              >
                <MenuItem value="0" disabled>Choose a user</MenuItem>
                {usersFromServer.map(user => (
                  <MenuItem
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
            {isUserNotSelected
              && <span className="error">Please choose a user</span>}
          </div>

          <Button
            className="Button"
            type="submit"
            data-cy="submitButton"
            variant="contained"
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </div>
    </Paper>
  );
};
