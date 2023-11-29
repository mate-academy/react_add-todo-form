import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

const getUserId = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};

const initialTodo: Todo[] = todosFromServer.map(
  (todo) => ({
    ...todo,
    user: getUserId(todo.userId),
  }),
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasErrorUser, setHasErrorUser] = useState(false);
  const [todos, setTodos] = useState(initialTodo);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasErrorTitle(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasErrorUser(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasErrorTitle(false);
    setHasErrorUser(false);
  };

  const addNewTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId,
      user: getUserId(userId),
    };

    setTodos([...todos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasErrorTitle(true);
    }

    if (!userId) {
      setHasErrorUser(true);
    }

    if (!title || !userId) {
      return;
    }

    addNewTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {
              usersFromServer.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {
            hasErrorUser && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
