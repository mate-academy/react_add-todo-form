import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/todo';

function getNewId(todos: Todo[]) {
  const todosIds: number[] = todos.map(todo => todo.id);
  const maxId = todosIds.length ? Math.max(...todosIds) : 0;

  return maxId + 1;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  function reset() {
    setTitle('');
    setSelectedUserId('');
    setErrorTitle(false);
    setErrorUser(false);
  }

  function addNewTodo(newTodo: Todo) {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValidTitle = title.trim().length === 0;
    const isValidUser = selectedUserId === '';

    setErrorTitle(isValidTitle);
    setErrorUser(isValidUser);

    if (isValidTitle || isValidUser) {
      return;
    }

    const newTodo: Todo = {
      user: getUserById(+selectedUserId),
      id: getNewId(todos),
      title: title.trim(),
      completed: false,
      userId: +selectedUserId,
    };

    if (!isValidTitle && !isValidUser) {
      addNewTodo(newTodo);
      reset();
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUser}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
