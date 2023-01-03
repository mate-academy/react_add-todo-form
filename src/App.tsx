import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
}

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [option, setOption] = useState('0');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [userIsSelected, setUserIsSelected] = useState(true);
  const [titleOnPaper, setTitleOnPaper] = useState(true);
  const [allTodos, setAllTodos] = useState(todosWithUser);

  const addTodo = () => {
    const maxId = Math.max(...allTodos.map(todo => todo.id));

    return ({
      id: maxId + 1,
      title: titleInputValue,
      completed: false,
      userId: +option,
      user: getUser(+option),
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          if (option === '0') {
            setUserIsSelected(false);
          }

          if (!titleInputValue.length) {
            setTitleOnPaper(false);
          }

          if (titleInputValue.length && option !== '0') {
            setAllTodos([
              ...allTodos,
              addTodo(),
            ]);
          }
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={titleInputValue}
            onChange={(event) => {
              setTitleInputValue(event.target.value);
              setTitleOnPaper(true);
            }}
          />

          {!titleOnPaper && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={option}
            onChange={(event) => {
              setOption(event.target.value);
              setUserIsSelected(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!userIsSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
