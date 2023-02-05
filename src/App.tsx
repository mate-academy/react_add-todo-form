import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Input, Select, Submit } from './types/events';

import './App.scss';

export const App = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const createTodoInfoId = () => {
    const ids = todos.map(({ id }) => id);

    return Math.max(...ids) + 1;
  };

  const handleInputChange = (event: Input) => {
    const { value } = event.target;

    setTitle(value);

    if (!title) {
      setIsTitle(false);
    }
  };

  const handleSelectChange = (event: Select) => {
    const { value } = event.target;

    setUser(value);

    if (!user) {
      setIsUser(false);
    }
  };

  const handleSubmit = (event: Submit) => {
    event.preventDefault();

    if (!user) {
      setIsUser(true);
    }

    if (!title) {
      setIsTitle(true);
    }

    if (title && user) {
      const todo = {
        id: createTodoInfoId(),
        title,
        userId: Number(user),
        completed: true,
      };

      setTodos(prev => [
        ...prev,
        todo,
      ]);

      setTitle('');
      setUser('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputChange}
            />
          </label>
          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="userId"
              value={user}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {isUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
