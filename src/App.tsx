import React, { useState } from 'react';
import './App.scss';

import { Button, Paper, FormControl } from '@mui/material';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

function findUserFullname(fullName: string): User | null {
  return usersFromServer.find(user => user.name === fullName) || null;
}

export const initialTodosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userSelect, setUserSelect] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(initialTodosList);
  const [isErrorMessageEmptyTitle, setErrorMessageEmptyTitle] = useState(false);
  const [isErrorMessageEmptyUser, setErrorMessageEmptyUser] = useState(false);

  const handleTitleEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorMessageEmptyTitle(false);
  };

  const handleChooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.currentTarget.value);
    setErrorMessageEmptyUser(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setErrorMessageEmptyTitle(true);

      return;
    }

    if (userSelect === '') {
      setErrorMessageEmptyUser(true);

      return;
    }

    const addNewTodo = findUserFullname(userSelect);

    setTodos(currentTodos => {
      const largestTodoId = Math.max(...currentTodos.map(todo => todo.id));

      const choosenTodo = {
        id: largestTodoId + 1,
        title,
        completed: false,
        userId: addNewTodo ? addNewTodo.id : null,
        user: addNewTodo,
      };

      return [...currentTodos, choosenTodo];
    });

    setUserSelect('');
    setTitle('');
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
            <label>
              <FormControl fullWidth>
                <span>Title: </span>
                <input
                  type="text"
                  data-cy="titleInput"
                  placeholder="Enter a title"
                  id="title"
                  value={title}
                  onChange={handleTitleEnter}
                />
              </FormControl>
            </label>

            {isErrorMessageEmptyTitle
              && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <label>
              <span>User: </span>

              <FormControl fullWidth>
                <select
                  data-cy="userSelect"
                  id="userSelect"
                  value={userSelect}
                  onChange={handleChooseUser}
                >
                  <option
                    disabled
                    value=""
                  >
                    Choose a user
                  </option>

                  {usersFromServer.map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </label>

            {isErrorMessageEmptyUser
              && <span className="error">Please choose a user</span>}
          </div>

          <Button
            className="Button"
            type="submit"
            data-cy="submitButton"
            variant="contained"
            color="success"
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </div>
    </Paper>
  );
};
