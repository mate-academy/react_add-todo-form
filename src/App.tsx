import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/user';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId: number): User | null {
  const desiredUser = usersFromServer.find(user => userId === user.id);

  return desiredUser || null;
}

const allTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, addTodos] = useState(allTodos);
  const [isValid, setIsValid] = useState(true);
  const [inputText, setInputText] = useState('');
  const [inputUserId, setInputUserId] = useState(-1);

  let maxId = Math.max(...todos.map(el => el.id)) + 1;

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputText.trim() === '' || inputUserId === -1) {
      setIsValid(false);

      return;
    }

    setIsValid(true);
    maxId += 1;

    const newTodo: Todo = {
      id: maxId,
      title: inputText,
      completed: false,
      user: getUserById(inputUserId),
    };

    addTodos([...todos, newTodo]);

    setInputUserId(-1);
    setInputText('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value);
            }}
          />
          {!isValid
            && (inputText !== ''
            || (<span className="error">Please enter a title</span>))}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={inputUserId}
            onChange={(event) => {
              setInputUserId(Number(event.target.value));
            }}
          >
            <option
              value="-1"
              defaultValue="-1"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.username}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isValid
            && (inputUserId !== -1
            || (<span className="error">Please choose a user</span>))}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
