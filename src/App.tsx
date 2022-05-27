import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(item => ({
  ...item,
  user: users.find(user => user.id === item.userId) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [userName, setUserName] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);
  const [todosList, setTodosList] = useState(preparedTodos);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^A-Za-z0-9А-Яа-я ]/g, ''));
    setIsValidTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsValidUser(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsValidTitle(true);
    }

    if (!userName) {
      setIsValidUser(true);
    }

    if (title.trim() && userName) {
      const currentUser = users.find(({ name }) => name === userName);

      const newTodo = {
        userId: currentUser ? currentUser.id : 0,
        id: todos.length + 1,
        title: title.trim(),
        completed: false,
        user: currentUser || null,
      };

      setTodosList([...todosList, newTodo]);
      setTitle('');
      setUserName('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} className="App-form">
        <label className="App-form__label">
          <input
            className="App-form__item"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          />
          {isValidTitle && (
            <p className="App-form__error">Please enter the title</p>
          )}
        </label>
        <label className="App-form__label">
          <select
            className="App-form__item"
            name="user"
            value={userName}
            onChange={handleUser}
          >
            <option value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>
          {isValidUser && (
            <p className="App-form__error">Please choose a user</p>
          )}
        </label>
        <button type="submit" className="App-form__button">
          Add todo
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};

export default App;
