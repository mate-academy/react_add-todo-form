import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUsersById } from './services/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUsersById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [hesError, setHesError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodo);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && userId) {
      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: +userId,
        user: getUsersById(+userId),
      };

      setTitle('');
      setUserId('');
      setHesError(false);
      setTodos([...todos, newTodo]);
    } else {
      setHesError(true);
    }
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
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => setTitle(event.target.value)}
          />

          {(!title && hesError) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {(!userId && hesError) && (
            <span className="error">Please choose a user</span>
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
