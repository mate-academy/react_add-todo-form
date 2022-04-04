import React, { useState } from 'react';
import './styles/style.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

import todosFromServer from './api/todos';
import users from './api/users';

const App: React.FC = () => {
  const [todos, setTodos] = useState((): Todo[] => todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(-1);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const addTodo = () => {
    const todoId = todos.length + 1;

    const addedTodo: Todo = {
      userId,
      id: todoId,
      title,
      completed: false,
    };

    setTodos((state) => [addedTodo, ...state]);
  };

  const reset = () => {
    setTitleError(false);
    setUserIdError(false);
    setTitle('');
    setUserId(-1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || userId === -1) {
      setTitleError(!title);
      setUserIdError(userId === -1);

      return;
    }

    reset();
    addTodo();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setTitleError(false);
        break;

      case 'user-selector':
        setUserId(Number(value));
        setUserIdError(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="app">
      <form className="todo-list__form form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="form__item">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />

          {titleError && (
            <div className="form__item-error">
              Please enter the title
            </div>
          )}
        </label>

        <label htmlFor="user-selector" className="form__item">
          <select
            id="user-selector"
            name="user-selector"
            value={userId}
            onChange={handleChange}
          >
            <option value="">Choose name</option>
            {users.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {userIdError && (
            <div className="form__item-error">
              Please choose a user
            </div>
          )}
        </label>

        <button type="submit">
          Add Todo
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
