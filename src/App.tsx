import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [submited, setSubmited] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          setSubmited(true);
          if (!title || userId === 0) {
            return;
          }

          const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;
          const newTodo = {
            id: newTodoId,
            title,
            completed: false,
            userId,
          };

          setTodos([...todos, newTodo]);
          setTitle('');
          setUserId(0);
          setSubmited(false);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {submited && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userId === 0 && submited && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        <TodoList
          todos={todos.map(todo => ({
            ...todo,
            user: usersFromServer.find(user => user.id === todo.userId)!,
          }))}
        />
      </section>
    </div>
  );
};
