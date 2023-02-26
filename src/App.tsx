import React, { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import User from './types/User';
import Todo from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);
  const [userSelect, setUserSelect] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [userSelectError, setUserSelectError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleUserSelect = (value: string) => {
    setUserSelect(value);

    if (value.length) {
      setUserSelectError(false);
    }
  };

  const handleTitleInput = (value: string) => {
    setTitleInput(value);

    if (value.length) {
      setTitleError(false);
    }
  };

  const clearForm = () => {
    setTitleInput('');
    setUserSelect('');
  };

  const addTodo = () => {
    setUserSelectError(!userSelect.length);
    setTitleError(!titleInput.length);

    if (userSelect.length && titleInput.length) {
      const newId = Math.max(...todoList.map(todo => todo.id)) + 1;
      const foundUser = usersFromServer.find(user => user.name === userSelect)
        || null;
      const newTodo: Todo = {
        id: newId,
        title: titleInput,
        completed: false,
        userId: foundUser ? foundUser.id : 0,
        user: foundUser,
      };

      setTodoList(todo => ([
        ...todo,
        newTodo,
      ]));

      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <label>
            Title:

            <input
              className="titleInput"
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={titleInput}
              onChange={({ target }) => handleTitleInput(target.value)}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              className="userSelect"
              data-cy="userSelect"
              value={userSelect}
              onChange={({ target }) => handleUserSelect(target.value)}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ name }) => (
                <option
                  value={name}
                  key={name}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {userSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
