import React, { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import './App.scss';

export const App: React.FC = () => {
  const preparedTodos = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    };
  });

  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsTitleEmpty(true);
    }

    if (!userId) {
      setIsUserSelected(false);
    }

    if (title && userId) {
      setTodos(currTodos => ([
        ...currTodos,
        {
          id: Math.max(...currTodos.map(todo => todo.id)) + 1,
          title,
          completed: false,
          userId,
          user: usersFromServer.find(user => user.id === userId) || null,
        },
      ]));
      setTitle('');
      setUserId(0);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserSelected(true);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {isTitleEmpty
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            value={userId}
            data-cy="userSelect"
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {!isUserSelected
            && <span className="error">Please choose a user</span>}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
