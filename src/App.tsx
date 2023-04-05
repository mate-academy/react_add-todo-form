import './App.scss';
import {
  Box,
  Paper,
} from '@mui/material';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find((user) => user.id === userId);
};

const todosWithUsers = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

const getNewTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todoList, setTodoList] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      const newTodo = {
        id: getNewTodoId(todoList),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setTodoList([...todoList, newTodo]);
      setTitle('');
      setUserId(0);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="App">
      <Paper
        elevation={3}
        sx={{
          width: 'max-content',
          margin: 'auto',
          padding: 5,
          backgroundColor: '#a9de70',
        }}
      >
        <Box>
          <h1>Add todo form</h1>

          <form
            action="/api/users"
            className="form"
            method="POST"
            onSubmit={handleSubmit}
          >

            <div className="field">
              <label>
                Title:

                <input
                  type="text"
                  data-cy="titleInput"
                  value={title}
                  placeholder="Enter a title"
                  onChange={(event) => {
                    const { value } = event.target;

                    setTitle(value);
                  }}
                />
              </label>

              {showError && !title && (
                <span className="error">
                  Please enter a title
                </span>
              )}
            </div>

            <div className="field">
              <label>
                User:

                <select
                  data-cy="userSelect"
                  value={userId}
                  onChange={(event) => {
                    const { value } = event.target;

                    setUserId(+value);
                  }}
                >
                  <option value="0" disabled>Choose a user</option>

                  {usersFromServer.map((user) => {
                    const { id, name } = user;

                    return (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </label>

              {showError
                  && !userId
                  && (
                    <span className="error">
                      Please choose a user
                    </span>
                  )}
            </div>

            <button type="submit" data-cy="submitButton">
              Add
            </button>
          </form>

          <TodoList todos={todoList} />
        </Box>
      </Paper>
    </div>
  );
};
