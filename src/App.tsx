import React, { useState } from 'react';
import './App.scss';
import { Todo, FullTodo } from './react-app-env';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const fullTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(fullTodos);
  const [user, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [submit, setSubmit] = useState(false);

  function biggestID() {
    let biggest = 0;

    todos.forEach(todo => {
      if (todo.id > biggest) {
        biggest = todo.id;
      }
    });

    return biggest + 1;
  }

  const addTodo = () => {
    const newTodo: FullTodo = {
      id: biggestID(),
      title,
      completed: false,
      userId: +user - 1,
      user: usersFromServer[user - 1],
    };

    setTodos((state => (
      [...state, newTodo]
    )));
  };

  const resetForm = () => {
    setSubmit(false);
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    if (title && user) {
      addTodo();
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {
            submit && !title
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(e) => setUser(+e.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>

          {
            submit && !user
            && (<span className="error">Please choose a user</span>)
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
