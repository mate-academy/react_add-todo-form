import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/types';

const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([...todos]);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const addTodo = () => {
    const todoId = todos.length;

    const addedTodo = {
      userId,
      id: todoId,
      title,
      completed: false,
    };

    setTodo((prev) => [addedTodo, ...prev]);
  };

  const reset = () => {
    setTitle('');
    setUserId(-1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
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

      case 'user-select':
        setUserId(Number(value));
        setUserIdError(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <div className="addTodo">
        <form className="todo-list__form form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="form__item">
            <input
              name="title"
              value={title}
              onChange={handleChange}
            />
            {titleError && (
              <span className="error">Add title</span>
            )}
          </label>
          <label htmlFor="user-select" className="form__item">
            <select
              name="user-select"
              value={userId}
              onChange={handleChange}
            >
              <option value="0" disabled selected>Choose name</option>
              {users.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {userIdError && (
              <span className="error">Choose user</span>
            )}
          </label>
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
      <TodoList todos={todo} />
    </div>
  );
};

export default App;
