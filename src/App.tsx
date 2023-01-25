import React, { useState } from 'react';
import './App.scss';

import {
  TextField,
  Box,
  Button,
  MenuItem,
} from '@material-ui/core';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const defaultChooseOption = 'Choose a user';
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);

  const clear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId === 0 || title === '') {
      if (title === '') {
        setErrorOnTitleInput(true);
      }

      if (selectedUserId === 0) {
        setErrorOnUserSelect(true);
      }

      return;
    }

    const newUser = findUserById(selectedUserId);

    setTodos(currentTodo => {
      const maxTodoId = Math.max(...currentTodo.map(todo => todo.id));

      clear();

      return [
        ...currentTodo,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: newUser ? newUser.id : null,
          user: newUser,
        },
      ];
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (isErrorOnTitleInput) {
      setErrorOnTitleInput(false);
    }
  };

  const handleUserChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedUserId(+event.target.value);
      if (isErrorOnUserSelect) {
        setErrorOnUserSelect(false);
      }
    };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <TextField
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            label="Title: "
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {isErrorOnTitleInput && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <TextField
            select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUserId}
            label="User: "
            onChange={handleUserChange}
          >
            <MenuItem value="0" disabled>
              {defaultChooseOption}
            </MenuItem>

            {usersFromServer.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          {isErrorOnUserSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </Button>
        </Box>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
