import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  if (foundUser === null) {
    throw new Error('No user found');
  }

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [userInputError, setUserInputError] = useState('');
  const [titleInputError, setTitleInputError] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  const getUserByName = (name: string): User | null => {
    const foundUser = usersFromServer.find(users => users.name === name);

    if (foundUser === null) {
      throw new Error('No user found');
    }

    return foundUser || null;
  };

  const findHighestId = todos.reduce(
    (max, users) => (users.id > max ? users.id : max),
    todos[0].id,
  );

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    setIsSubmited(true);

    if (userInput === '') {
      setUserInputError('Please choose a user');
    } else {
      setUserInputError('');
    }

    if (titleInput === '') {
      setTitleInputError('Please enter a title');
    } else {
      setTitleInputError('');
    }

    if (titleInput !== '' && userInput !== '') {
      const submitUser = getUserByName(userInput);

      todos.push({
        title: titleInput,
        user: submitUser,
        userId: submitUser?.id,
        completed: false,
        id: findHighestId + 1,
      });
      setTitleInput('');
      setUserInput('');
    }
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
            value={titleInput}
            onChange={event => {
              setTitleInput(event.target.value);
              setTitleInputError('');
            }}
          />
          {titleInputError !== '' && isSubmited ? (
            <span className="error">{titleInputError}</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userInput}
            onChange={event => {
              setUserInput(event.target.value);
              setUserInputError('');
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
          {userInputError !== '' && isSubmited ? (
            <span className="error">{userInputError}</span>
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
