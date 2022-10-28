import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoWithUser } from './types';

function todoWithUsers(): TodoWithUser[] {
  return todosFromServer.map(todo => {
    const foundUser = usersFromServer.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: foundUser,
    };
  });
}

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(todoWithUsers());

  const [inputText, setInputText] = useState('');
  const [submittedTitle, setSubmittedTitle] = useState(true);

  const [selectedUser, setSelectedUser] = useState('0');
  const [submittedUser, setSubmittedUser] = useState(true);

  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText !== '') {
      setSubmittedTitle(true);
    } else {
      setSubmittedTitle(false);
    }

    if (selectedUser !== '0') {
      setSubmittedUser(true);
    } else {
      setSubmittedUser(false);
    }

    if (inputText !== '' && selectedUser !== '0') {
      setTodos(listOfTodos => {
        const sorted = [...todos].sort((a, b) => (a.id - b.id));
        const newId = sorted[sorted.length - 1].id + 1;
        const user = users.find(searchUser => {
          return searchUser.id === Number(selectedUser);
        });

        setInputText('');
        setSelectedUser('0');

        return (
          [
            ...listOfTodos,
            {
              id: newId,
              title: inputText,
              completed: false,
              userId: Number(selectedUser),
              user,
            },
          ]
        );
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => submitHandle(event)}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={inputText}
              onChange={(event) => {
                setSubmittedTitle(true);
                const char = event.target.value;

                setInputText(char.replace(/[^\p{L} ' ']/gu, ''));
              }}
            />
          </label>
          {!submittedTitle
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSubmittedUser(true);
                setSelectedUser(event.target.value);
              }}
            >
              <option value="0">Choose a user</option>
              {users.map(user => {
                const { id, name } = user;

                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {!submittedUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList
        todos={todos}
      />
    </div>
  );
};
