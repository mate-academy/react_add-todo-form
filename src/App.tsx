import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todos } from './types/Todos';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewToDos] = useState(todos);
  const [valueTitle, setValueTitle] = useState('');
  const [indexSelectName, setIndexSelectName] = useState(0);
  const [checkChooseTitle, setCheckChooseTitle] = useState(false);
  const [checkChooseUser, setCheckChooseUser] = useState(false);

  const maxId = newTodos.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));

  const handleForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (valueTitle.length === 0) {
      setCheckChooseTitle(true);
    }

    if (indexSelectName === 0) {
      setCheckChooseUser(true);
    }

    if (valueTitle.length > 0 && indexSelectName > 0) {
      const newUser = {
        id: maxId.id + 1,
        title: valueTitle,
        completed: false,
        userId: indexSelectName,
        user: findUser(indexSelectName),
      };

      setNewToDos([...newTodos, newUser]);

      setValueTitle('');
      setIndexSelectName(0);
    }
  };

  const handleTitle = (event: {
    target:
    { value: React.SetStateAction<string>; };
  }) => {
    setValueTitle(event.target.value);
    setCheckChooseTitle(false);
  };

  const handleUsers = (event: { target: { value: unknown; }; }) => {
    setIndexSelectName(Number(event.target.value));
    setCheckChooseUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleForm}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={valueTitle}
            onChange={handleTitle}
          />
          {checkChooseTitle && (
            <div className="notification">Please enter a title!</div>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={indexSelectName}
            onChange={handleUsers}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>
          {checkChooseUser && (
            <div className="notification">Please choose a user!</div>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
