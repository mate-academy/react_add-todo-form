import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './components/Type/User';
import { Todo } from './components/Type/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => userId === user.id);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let lastId = Math.max(...todos.map(({ id }) => id));

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const getNewTodo = () => {
    const newId = lastId + 1;

    lastId += 1;

    return {
      id: newId,
      title,
      completed: false,
      user: getUser(+selectUserId),
      userId: +selectUserId,
    };
  };

  const inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(event.target.value);
    setUserError(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!selectUserId);

    if (title && selectUserId) {
      setCurrentTodos([
        ...currentTodos,
        getNewTodo(),
      ]);
    }

    setTitle('');
    setSelectUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={submit}>
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={inputTitle}
          />
          {
            titleError
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectUserId}
            onChange={selectUser}
          >
            <option value="" disabled>Choose a user</option>
            {
              usersFromServer.map((user) => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>

          {
            userError && (
              <span className="error"> Please choose a user </span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
