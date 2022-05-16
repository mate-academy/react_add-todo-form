import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

import usersApi from './api/users';
import todosApi from './api/todos';

const preparedTodos: Todo[] = todosApi.map(todo => ({
  ...todo,
  user: usersApi.find(user => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsValidTitle(true);
    }

    if (!userId) {
      setIsValidUser(true);
    }

    if (title && userId) {
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
    setIsValidTitle(false);
  };

  const handleUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsValidUser(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todos</h1>

      <form className="App__form" onSubmit={handleForm}>
        <div className="App__wrapper">
          <label>
            <input
              className="App__input"
              type="text"
              value={title}
              onChange={handleTitle}
              placeholder="Please enter a title"
            />

            {isValidTitle && (
              <span className="App__error">
                Please enter a title
              </span>
            )}
          </label>

          <label>
            <select
              className="App__input"
              value={userId}
              onChange={handleUsers}
            >
              <option value="0" disabled>Choose a user</option>
              {usersApi.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {isValidUser && (
              <span className="App__error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" className="App__button">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
