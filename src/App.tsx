import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { OptionList } from './components/OptionList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = () => {
    const id = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id,
      title,
      completed: false,
      userId: selectedUserId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    addTodo();
    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /[^0-9A-Za-zА-яЇїЄєҐґ ]/g;

    const normalizedValue = event.target.value.replaceAll(pattern, '');

    setTitle(normalizedValue);
    setTitleError(false);
  };

  const handleSUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;

            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;

            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSUserSelect}
            >
              <option value="0" disabled>Choose a user</option>

              <OptionList users={usersFromServer} />
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
