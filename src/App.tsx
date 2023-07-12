import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const todosArr: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState('0');
  const [todos, setTodos] = useState<Todo[]>(todosArr);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isSelectUserIdValid, setIsSelectUserIdValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯЄєІіЇїҐґ0-9\s]/g, ''));
    setIsTitleValid(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(event.target.value);
    setIsSelectUserIdValid(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setIsTitleValid(false);
    }

    if (selectUserId === '0') {
      setIsSelectUserIdValid(false);
    }

    if (title.trim() && (selectUserId !== '0')) {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          {
            id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
            title: title.trim(),
            userId: +selectUserId,
            completed: false,
            user: findUserById(+selectUserId),
          },
        ];
      });

      setTitle('');
      setSelectUserId('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Please enter a title"
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
              value={selectUserId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isSelectUserIdValid && (
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
