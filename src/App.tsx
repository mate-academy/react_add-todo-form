/* eslint-disable import/no-cycle */
import React, { useState } from 'react';

import './App.css';

import todos from './api/todos';
import users from './api/users';

import { User } from './components/UserInfo/UserInfo';
import { Todo } from './components/TodoInfo/TodoInfo';
import { TodoList } from './components/TodoList/TodoList';

export interface PreparedTodo extends Todo {
  user: User | null;
}

export const preparedTodos: PreparedTodo[] = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => (
    user.id === todo.userId
  )) || null,
}) as PreparedTodo);

export const App: React.FC = () => {
  const [todo, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [titleDirty, setTitleDirty] = useState(false);
  const [userName, setUserName] = useState('Choose a user');
  const [userNameDirty, setUserNameDirty] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleDirty(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setUserNameDirty(false);
  };

  const addTodo = () => {
    const newUser = users.find(
      user => user.name === userName,
    ) || null;

    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo = {
      id: todo[todo.length - 1].id + 1,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    setTodos([...todo, newTodo]);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userName) {
      setUserNameDirty(!userName);
      setTitleDirty(!title);
    }

    addTodo();

    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <div className="App__container">
        <form
          onSubmit={handleFormSubmit}
          className="App__form"
        >
          {titleDirty && <div className="App__form-error">Ведіть Title</div>}
          <input
            className="App__input"
            type="text"
            placeholder="write title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          {userNameDirty && <div className="App__form-error">Error</div>}
          <select
            className="App__select"
            data-cy="userSelect"
            name="name"
            value={userName}
            onChange={handleSelectChange}
          >
            <option className="App__option">
              Choose a user
            </option>
            {
              users.map((user) => (
                <option
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }

          </select>

          <button
            className="App__button"
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={todo} />
      </div>
    </div>
  );
};
