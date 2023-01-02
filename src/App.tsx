import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types/types';
import { TodoList } from './components/TodoList';

const findUserById = (id: number, users: User[]) => {
  return users.find(user => user.id === id) || null;
};

const requiredTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId, usersFromServer),
}));

const findGreatestId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

export const App = () => {
  const [info, setInfo] = useState({
    title: '',
    todos: requiredTodos,
    userId: '0',
    isValidTitle: true,
    isValidUserId: true,
  });

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title,
      todos,
      userId,
    } = info;

    let titleIsCorrect = true;
    let currentTitle = title;

    const buttonCondition
      = userId !== '0' && title !== '' && title.trim() !== '';

    const titleErrorCondition = title === '' || title.trim() === '';
    const userErrorCondition = userId === '0';

    if (titleErrorCondition) {
      currentTitle = '';
      titleIsCorrect = false;

      setInfo({
        ...info,
        title: currentTitle,
        isValidTitle: titleIsCorrect,
      });
    }

    if (userErrorCondition) {
      setInfo({
        ...info,
        title: currentTitle,
        isValidTitle: titleIsCorrect,
        isValidUserId: false,
      });
    }

    if (buttonCondition) {
      const newUser = findUserById(Number(userId), usersFromServer);
      const newId = findGreatestId(todos) + 1;
      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        userId: newUser ? newUser.id : null,
        user: newUser,
      };

      setInfo({
        ...info,
        userId: '0',
        todos: [...todos, newTodo],
        title: '',
      });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      title: event.target.value,
      isValidTitle: true,
    });
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        className="App__form"
      >
        <div className="App__field">
          <FormControl error={!info.isValidTitle}>
            <TextField
              id="outlined-error-helper-text"
              label="Title"
              variant="outlined"
              className="App__input"
              value={info.title}
              onChange={handleTitleChange}
              autoComplete="off"
              data-cy="titleInput"
              error={!info.isValidTitle}
            />
            <FormHelperText className={cn(
              { 'title-error': info.isValidTitle },
            )}
            >
              Please choose a user
            </FormHelperText>
          </FormControl>

        </div>

        <div className="App__field">

          <FormControl error={!info.isValidUserId}>
            <InputLabel id="demo-simple-select-helper-label">
              User
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={info.userId}
              label="User"
              className="App__input"
              onChange={event => {
                setInfo({
                  ...info,
                  userId: event.target.value,
                  isValidUserId: true,
                });
              }}
            >
              <MenuItem value="0" disabled>
                <em>Choose a user</em>
              </MenuItem>

              {usersFromServer.map(user => (
                <MenuItem key={user.id} value={`${user.id}`}>
                  {user.name}
                </MenuItem>
              ))}

            </Select>

            <FormHelperText className={cn(
              { 'user-error': info.isValidUserId },
            )}
            >
              Please choose a user
            </FormHelperText>
          </FormControl>
        </div>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          data-cy="submitButton"
          onClick={handleClick}
          className="App__Button"
        >
          Send
        </Button>

      </form>

      <TodoList todos={info.todos} />
    </div>
  );
};
