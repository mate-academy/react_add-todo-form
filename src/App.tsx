import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/todos';

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [nameError, setnameError] = useState(false);
  const [title, setTitle] = useState('');
  const [nameId, setNameId] = useState(0);

  const getId = todos.reduce((acc, todo) => {
    return Math.max(acc, todo.id);
  }, -Infinity);

  const reset = () => {
    setTitle('');
    setTitleError(false);
    setnameError(false);
    setNameId(0);
  };

  const addTodo = (newTodo: Todos) => {
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (nameId === 0) {
      setnameError(true);
    }

    const onSubmit = {
      id: getId + 1,
      title,
      completed: false,
      userId: nameId,
    };

    if (title && nameId !== 0) {
      addTodo(onSubmit);
      reset();
    }
  };

  const handleName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNameId(+event.target.value);
    setnameError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError
            ? <span className="error">Please enter a title</span>
            : ''}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={nameId}
            onChange={handleName}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              );
            })}
          </select>

          {nameError
            ? <span className="error">Please choose a username</span>
            : ''}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
