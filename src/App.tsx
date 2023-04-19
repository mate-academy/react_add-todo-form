import './App.scss';
import {
  Box,
  Paper,
} from '@mui/material';

import { ChangeEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUserById = (userId: number): User | null => (
  usersFromServer.find((user) => user.id === userId) || null
);

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
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      setHasError(true);

      return;
    }

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
    setHasError(false);
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
                  onChange={handleInputChange}
                />
              </label>

              {hasError && !title && (
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
                  onChange={handleChangeUser}
                >
                  <option value="0" disabled>Choose a user</option>

                  {usersFromServer.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              {hasError && !userId && (
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
