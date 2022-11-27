import React, { useState, useEffect } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [todosItems, setTodosItems] = useState(todos);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVisibleTittleError, setIsVisibleTittleError] = useState(false);

  useEffect(() => {
    setIsVisibleTittleError(false);
  }, [title]);

  const resetForm = () => {
    setTitle('');
    setUserName('');
    setIsSubmit(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);

    if (!title || !userName) {
      setIsVisibleTittleError(true);

      return;
    }

    const correctTitle = title.trimEnd();
    const maxId = Math.max.apply(null, todosItems.map((elem) => elem.id));
    const selectedUser = usersFromServer.find((user) => (
      user.name === userName
    ));

    const newTodo = {
      id: maxId + 1,
      title: correctTitle,
      userId: selectedUser?.id || null,
      completed: false,
      user: selectedUser || null,
    };

    setTodosItems((currentTodos) => [
      ...currentTodos,
      newTodo,
    ]);

    resetForm();
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const lastSymbol = event
      .currentTarget.value[event.currentTarget.value.length - 1];

    if (/[^\d\sA-Za-zA-ЯА-я]/.test(lastSymbol)
      || event.currentTarget.value[0] === ' ') {
      // eslint-disable-next-line no-alert
      alert(`Title can contains letters (ru and en), digits,
        and spaces in the middle of title`);

      const valueTittle = event.currentTarget.value.slice(0, -1);

      setTitle(valueTittle);

      return;
    }

    setTitle(event.currentTarget.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title-input">
            Title
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title-input"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          {!title && isVisibleTittleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-input">
            User
          </label>
          <select
            data-cy="userSelect"
            id="user-input"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {isSubmit && !userName && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todosItems={todosItems} />
    </div>
  );
};
