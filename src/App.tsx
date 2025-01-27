import React, { FormEventHandler, useEffect, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    if (user === '') {
      setUserError('Please choose a user');
    } else {
      setUserError('');
    }

    if (title === '') {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }

    // return () => {
    //   setIsSubmited(false);
    // };
  }, [user, title]);

  const getUserByName = (name: string): User | null => {
    const foundUser = usersFromServer.find(users => users.name === name);

    return foundUser || null;
  };

  const findHighestId = todos.reduce(
    (max, users) => (users.id > max ? users.id : max),
    todos[0].id,
  );

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    setIsSubmited(true);

    if (titleError !== '' || userError !== '') {
      return;
    }

    todos.push({
      title: title,
      user: getUserByName(user),
      userId: getUserByName(user)?.id,
      completed: false,
      id: findHighestId + 1,
    });

    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          {titleError !== '' && isSubmited ? (
            <span className="error">{titleError}</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={user}
            onChange={event => {
              setUser(event.target.value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(users => {
              return (
                <option key={users.id} value={users.name}>
                  {users.name}
                </option>
              );
            })}
          </select>
          {userError !== '' && isSubmited ? (
            <span className="error">{userError}</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
