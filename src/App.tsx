// import React from 'react';
import React, { FormEvent, useState } from 'react';
import './App.scss';

import {
  Button,
  FormControl,
  Paper,
} from '@mui/material';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const getUserById = (userId: number) => (
  usersFromServer.find(user => user.id === userId) || null
);

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const createTodo = (id: number, title: string, userId: number) => ({
  id,
  title,
  userId,
  completed: false,
  user: getUserById(userId),
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userErrorStatus, setUserErrorStatus] = useState(false);
  const [titleErrorStatus, setTitleErrorStatus] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === '' || selectedUserId === 0) {
      setTitleErrorStatus(title.trim() === '');
      setUserErrorStatus(selectedUserId === 0);

      return;
    }

    const nextTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    setTodos(prevTodos => ([
      ...prevTodos,
      createTodo(nextTodoId, title, selectedUserId),
    ]));

    setTitle('');
    setSelectedUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleErrorStatus === true) {
      setTitleErrorStatus(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    if (userErrorStatus === true) {
      setUserErrorStatus(false);
    }
  };

  return (
    <div className="App">
      <Paper className="App__content" elevation={8}>
        <h1>Add todo form</h1>

        <form className="App__form" onSubmit={handleSubmit}>
          <div className="App__form-field">
            <input
              className="App__form-input"
              type="text"
              placeholder="Enter Title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
            {titleErrorStatus && (
              <span className="App__form-error error">
                Please enter a title
              </span>
            )}
          </div>

          <div className="App__form-field">
            <FormControl fullWidth>
              <select
                data-cy="userSelect"
                className="App__form-select"
                value={String(selectedUserId)}
                onChange={handleUserChange}
              >
                <option value={0} disabled>Choose a user</option>
                {usersFromServer.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </FormControl>

            {userErrorStatus && (
              <span className="App__form-error error">
                Please choose a user
              </span>
            )}
          </div>

          <div className="App__form-button">
            <Button
              variant="contained"
              type="submit"
              data-cy="submitButton"
              style={{ minWidth: '200px' }}
            >
              Add
            </Button>
          </div>
        </form>

        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
