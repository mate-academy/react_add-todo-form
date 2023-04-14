/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

let todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUserId, setUser] = useState('0');
  const [todoList, setTodos] = useState(todos);
  const [isTitleError, setTitleErrorStatus] = useState(false);
  const [isUserError, setUserErrorStatus] = useState(false);
  const addTodo = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (inputTitle.trim() === '') {
      setTitleErrorStatus(true);

      return;
    }

    let maxId = 0;

    todos.forEach(todo => {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    });

    todos = [
      ...todos,
      {
        id: maxId + 1,
        title: inputTitle,
        completed: false,
        userId: +selectedUserId,
        user: getUser(+selectedUserId),
      },
    ];

    setTodos(todos);
    setInputTitle('');
    setUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>{'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title"
              value={inputTitle}
              onChange={event => {
                const regex = /\d|[a-z]|[а-я]|\s/i;
                const currValue = event.target.value;

                if (regex.test(currValue.slice(-1)) || currValue === '') {
                  setInputTitle(event.target.value);
                }

                setTitleErrorStatus(false);
              }}
            />
          </label>
          {
            isTitleError
              ? <span className="error">Please enter a title</span>
              : ''
          }
        </div>

        <div className="field">
          <label>{'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => {
                setUser(event.target.value);
                setUserErrorStatus(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {
            isUserError
              ? <span className="error">Please choose a user</span>
              : ''
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(event) => {
            if (inputTitle && +selectedUserId) {
              return addTodo(event);
            }

            if (inputTitle) {
              setTitleErrorStatus(false);
            } else {
              setTitleErrorStatus(true);
            }

            if (+selectedUserId) {
              setUserErrorStatus(false);
            } else {
              setUserErrorStatus(true);
            }

            return event.preventDefault();
          }}
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todoList}
      />
    </div>
  );
};
