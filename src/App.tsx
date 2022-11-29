import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todosUsersFromServer: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App:React.FC = () => {
  const [todos, setTodos] = useState(todosUsersFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUser] = useState(0);
  const [isWrongInput, setIsWrongInput] = useState(false);

  const handleChangeTitle = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const regExp = /^[\sa-zA-Zа-яА-Я0-9\w]*$/;

    if (regExp.test(changeEvent.target.value)) {
      setTitle(changeEvent.target.value);
    }
  };

  const handleChangeUser = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUser(Number(changeEvent.target.value));
  };

  const handleSubmit = (
    changeEvent: React.FormEvent<HTMLFormElement>,
  ) => {
    changeEvent.preventDefault();

    if (!title.trim() || !userId) {
      setIsWrongInput(true);
    } else {
      const addedTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title.trim(),
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setTodos(prevTodos => ([
        ...prevTodos,
        addedTodo,
      ]));

      setTitle('');
      setUser(0);
      setIsWrongInput(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />

          {(!title && isWrongInput) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            name="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {(!userId && isWrongInput) && (
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
