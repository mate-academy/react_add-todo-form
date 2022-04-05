import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState([...todos]);
  const [userId, setUserId] = useState(-1);
  const [title, setTitle] = useState('');

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

    reset();
    addTodo();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'user-select':
        setUserId(Number(value));
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
          </label>
          <label htmlFor="user-selector" className="form__item">
            <select
              name="user-select"
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
