import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/ToDo';

const posts = todosFromServer.map((todo) => {
  const user = usersFromServer.find((person) => person.id === todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(posts);
  const [titleField, setTitleField] = useState('');
  const [userName, setUserName] = useState('');

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const addPost = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleField(event.target.value);
    setErrorTitle(false);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setErrorName(false);
  };

  const reset = () => {
    setUserName('');
    setTitleField('');

    setErrorName(false);
    setErrorTitle(false);
  };

  const sendPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextId = Math.max(...todos.map((todo) => todo.id)) + 1;

    const objToAdd = {
      id: +nextId,
      title: titleField,
      completed: false,
      userId: nextId,
      user: usersFromServer.find((user) => user.name === userName) || null,
    };

    if (!titleField) {
      setErrorTitle(true);
    }

    if (!userName) {
      setErrorName(true);
    }

    if (!titleField || !userName) {
      return;
    }

    addPost(objToAdd);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={sendPost}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleField}
            onChange={onChangeTitle}
            placeholder="Enter a title"
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select onChange={onChangeName} data-cy="userSelect" value={userName}>
            <option value="">Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {errorName && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
