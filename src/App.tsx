import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types.ts/Todo';
import { User } from './types.ts/User';

function findUser(todoUserId: number): User | null {
  return usersFromServer.find(user => user.id === todoUserId) || null;
}

function prepareTodos(todos: Omit<Todo, 'user'>[]): Todo[] {
  const preparedTodos: Todo[] = todos.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
    completed: false,
  }));

  return preparedTodos;
}

const initialTodos = prepareTodos(todosFromServer);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState<User[]>(usersFromServer);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [maxId, setMaxId] = useState(Math.max(...todos.map(todo => todo.id)));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleError(!title);
    setSelectError(!user);

    if (title.trim() && user) {
      const newTodo: Todo = {
        id: maxId + 1,
        title: title,
        completed: false,
        userId: +user,
        user: findUser(+user),
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTitle('');
      setUser('');
      setMaxId(currentMaxId => currentMaxId + 1);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:{' '}
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={event => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              value={user}
              onChange={event => {
                setUser(event.target.value);
                setSelectError(false);
              }}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {users.map(us => (
                <option key={us.id} value={us.id}>
                  {us.name}
                </option>
              ))}
            </select>
            {selectError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
