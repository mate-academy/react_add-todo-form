import React, { useState } from 'react';
import './App.scss';

import { Button, Typography, Paper } from '@mui/material';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState([...preparedTodos]);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const reset = () => {
    setNewTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!newTitle);
    setUserError(!selectedUser);

    if (newTitle && selectedUser) {
      setTodos(prev => {
        const newTodo = {
          id: getNewId(prev),
          title: newTitle,
          userId: selectedUser,
          completed: false,
          user: getUserById(+selectedUser),
        };

        return [...prev, newTodo];
      });

      reset();
    }
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <Paper className="container">
        <Typography variant="h3">Add todo form</Typography>

        <form
          action="/api/users"
          method="POST"
          className="App__form"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label>
              {'Title: '}
              <input
                type="text"
                className="titleInput"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={newTitle}
                onChange={handleNewTitle}
              />
            </label>
            {isTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <label>
              {'User: '}
              <select
                data-cy="userSelect"
                className="userSelect"
                value={selectedUser}
                onChange={handleSelectedUser}
              >
                <option value="0" disabled>Choose a user</option>

                {usersFromServer.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {isUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <Button
            variant="contained"
            type="submit"
            color="success"
            data-cy="submitButton"
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
