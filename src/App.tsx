import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTittleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addNewTODO = (id: number) => {
    const foundedUser = usersFromServer.find(user => user.id === id);
    const uniqueId = Math.max(...todos.map(todo => todo.id)) + 1;
    const titleLength = title.trim().length;

    if (titleLength === 0) {
      setTittleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (foundedUser && titleLength > 0) {
      todos.push({
        id: uniqueId,
        userId: id,
        title,
        completed: false,
        user: foundedUser,
      });

      setTitle('');
      setSelectedUser(0);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTittleError(false);
  };

  const handleChangeSelectedUser
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedUser(+event.target.value);
      setUserError(false);
    };

  const handleSubmitionForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTODO(selectedUser);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitionForm}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleChangeSelectedUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id} key={id}>{name}</option>
                );
              })}
            </select>

            {userError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
