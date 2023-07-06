import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Tobo';

import './App.scss';

const findUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const todosArr: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosArr);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isSelectUserValid, setIsSelectUserValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯЄєІіЇїҐґ0-9\s]/g, ''));
    setIsTitleValid(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(event.target.value);
    setIsSelectUserValid(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setIsTitleValid(false);
    }

    if (selectUser === '0') {
      setIsSelectUserValid(false);
    }

    if (title.trim() && selectUser !== '0') {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          {
            id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
            title: title.trim(),
            userId: +selectUser,
            completed: false,
            user: findUserById(+selectUser),
          },
        ];
      });

      setTitle('');
      setSelectUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
        <label>
            {'Title: '}
            <input
              value={title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleInputChange}
            />
            {!isTitleValid && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
        <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectUser}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isSelectUserValid && (
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
