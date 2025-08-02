import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: TodoWithUser[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [option, setOption] = useState('');
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  function onAdd(newTodo: TodoWithUser) {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function reset() {
    setTitle('');
    setOption('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setWasSubmitted(true);

    if (!title.trim() || option === '') {
      return;
    }

    onAdd({
      id: getNewTodoId(todos),
      title: title,
      completed: false,
      userId: +option,
      user: getUserById(+option),
    });

    reset();
    setWasSubmitted(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event =>
              setTitle(
                event.target.value.replace(/[^a-zA-Zа-яА-ЯєЄіІїЇґҐ0-9 ]/g, ''),
              )
            }
          />
          {wasSubmitted && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={option}
            onChange={event => setOption(event.target.value)}
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

          {wasSubmitted && !option && (
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
