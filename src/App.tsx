import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import User from './types/User';
import Todo from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelectedUserId, setErrorSelectedUserId] = useState(false);

  function getId(todosArr: Todo[]): number {
    const sortedTodos = [...todosArr].sort((a, b) => b.id - a.id);

    return sortedTodos[0].id + 1;
  }

  const addTodo = (newTodo: Todo) => {
    setCurrentTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setErrorTitle(true);
    }

    if (!selectedUserId) {
      setErrorSelectedUserId(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    addTodo({
      id: getId(currentTodos),
      title: title,
      userId: selectedUserId,
      completed: false,
      user: getUserById(selectedUserId),
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="titleInput">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
          </label>

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="userSelected">
            User:{' '}
          </label>

          <select
            data-cy="userSelect"
            id="userSelected"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setErrorSelectedUserId(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorSelectedUserId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={currentTodos} />
      </section>
    </div>
  );
};
