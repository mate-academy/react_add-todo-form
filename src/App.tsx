import React, { useState } from 'react';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersApi from './api/users';
import todosApi from './api/todos';

const preparedTodos: Todos[] = todosApi.map((todo) => ({
  ...todo,
  user: usersApi.find(user => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isValidTitle, setValidTitle] = useState(false);
  const [isValidUser, setValidUser] = useState(false);

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setValidUser(true);
    }

    if (!title.trim()) {
      setValidTitle(true);
    }

    if (userId && title.trim()) {
      const newTodo = {
        userId,
        id: todosApi[todosApi.length - 1].id + 1,
        title,
        completed: false,
        user: usersApi.find(user => user.id === userId),
      };

      setTodos((current) => [...current, newTodo]);
      setUserId(0);
      setTitle('');
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setValidTitle(false);
  };

  const handleUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setValidUser(false);
  };

  return (
    <div className="app">
      <h1 className="app__title">Todoer</h1>

      <form className="app__form" onSubmit={handleForm}>

        <label>
          <input
            className="app__input"
            type="text"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a title"
          />

          {isValidTitle && (
            <span className="app__error">
              Please enter a correct title
            </span>
          )}
        </label>

        <label>
          <select
            className="app__input"
            value={userId}
            onChange={handleUsers}
          >
            <option value="0" disabled>Choose a user</option>
            {usersApi.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {isValidUser && (
            <span className="app__error">
              Please choose a correct user
            </span>
          )}
        </label>

        <button type="submit" className="app__button">Add task</button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};

export default App;
