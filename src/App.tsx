import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todos } from './types/Todos';

export const App = () => {
  const getUserById = (userId: number): User | null =>
    usersFromServer.find(user => user.id === userId) || null;

  const initialTodos: Todos[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [userList] = useState(usersFromServer);
  const [todosList, setTodosList] = useState(initialTodos);

  const [titleInput, setTitleInput] = useState('');
  const [userSelected, setUserSelected] = useState('');

  const [titleInputError, setTitleInputError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  const receiveTheMaxId = () => {
    const todoIds = todosList.map(todo => todo.id);

    return Math.max(...todoIds) + 1;
  };

  const createNewTodo = (): Todos => ({
    id: receiveTheMaxId(),
    title: titleInput.trim(),
    completed: false,
    userId: +userSelected,
    user: getUserById(+userSelected),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (titleInput === '') {
      setTitleInputError(true);
      isValid = false;
    } else {
      setTitleInputError(false);
    }

    if (userSelected === '') {
      setUserSelectError(true);
      isValid = false;
    } else {
      setUserSelectError(false);
    }

    if (isValid) {
      setTodosList(prevTodos => [...prevTodos, createNewTodo()]);
      setTitleInput('');
      setUserSelected('');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(event.target.value);

    if (event.target.value !== '') {
      setUserSelectError(false);
    }
  };

  const validateTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkValues = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitleInput(checkValues);

    if (checkValues !== '') {
      setTitleInputError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            placeholder="Enter a title"
            onChange={validateTitleChange}
          />
          {titleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelected}
            onChange={handleSelectChange}
          >
            <option value="" disabled={userSelected !== ''}>
              Choose a user
            </option>
            {userList.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
