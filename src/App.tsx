import React, { useState } from 'react';
import './App.scss';

import { Button, Paper, FormControl } from '@mui/material';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByFullname(fullName: string): User | null {
  return usersFromServer.find(user => user.name === fullName) || null;
}

export const initialTodosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUser, setselectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(initialTodosList);
  const [isTitleErrorMessage, setIsTitleErrorMessage] = useState(false);
  const [isUserErrorMessage, setIsUserErrorMessage] = useState(false);

  const handleTitleEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleErrorMessage(false);
  };

  const handleChooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedUser(event.currentTarget.value);
    setIsUserErrorMessage(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setIsTitleErrorMessage(!title);
      setIsUserErrorMessage(!selectedUser);

      return;
    }

    const addNewTodo = findUserByFullname(selectedUser);

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

    setselectedUser('');
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

            {isTitleErrorMessage
              && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <label>
              <span>User: </span>

              <FormControl fullWidth>
                <select
                  data-cy="selectedUser"
                  id="selectedUser"
                  value={selectedUser}
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

            {isUserErrorMessage
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
