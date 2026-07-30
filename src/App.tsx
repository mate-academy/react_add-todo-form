import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type TodoWithUser = Todo & {
  user: User;
};

export const App = () => {
  const initialTodos: TodoWithUser[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    };
  });

  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [select, setSelect] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title === '') {
      setHasTitleError(true);
    }

    if (select === 0) {
      setHasSelectError(true);
    }

    if (title === '' || select === 0) {
      return;
    }

    const newId: number[] = todos.map(todo => todo.id);

    const selectedUser = usersFromServer.find(user => user.id === select)!;

    setTodos([
      ...todos,
      {
        id: Math.max(...newId) + 1,
        title,
        completed: false,
        userId: select,
        user: selectedUser,
      },
    ]);

    setTitle('');
    setSelect(0);
    setHasTitleError(false);
    setHasSelectError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />

          {hasTitleError ? (
            <span className="error">Please enter a title</span>
          ) : (
            ''
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={event => {
              setSelect(+event.target.value);
              setHasSelectError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError ? (
            <span className="error">Please choose a user</span>
          ) : (
            ''
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
