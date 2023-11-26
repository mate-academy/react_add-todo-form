import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [user, setUser] = useState('0');
  const [isUserValid, setIsUserValid] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.target.value;

    setTitle(titleValue);

    if (titleValue.trim()) {
      setIsTitleValid(true);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userValue = event.target.value;

    setUser(userValue);
    setIsUserValid(true);
  };

  const resetForm = () => {
    setTitle('');
    setUser('0');
    setIsTitleValid(true);
    setIsUserValid(true);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() && user !== '0') {
      const todo = {
        id: Math.max(...todos.map(item => item.id)) + 1,
        title,
        completed: false,
        userId: +user,
      };

      setTodos(currentTodos => [...currentTodos, todo]);

      resetForm();

      return;
    }

    if (!title || title !== title.trim()) {
      setIsTitleValid(false);
    }

    if (user === '0') {
      setIsUserValid(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="App__form--title">Title: </label>
          <input
            id="App__form--title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="App__form--select-user">User: </label>
          <select
            id="App__form--select-user"
            data-cy="userSelect"
            onChange={handleUserChange}
            value={user}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userItem => {
              const { id, name } = userItem;

              return (
                <option key={id} value={id}>{name}</option>
              );
            })}
          </select>

          {!isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
