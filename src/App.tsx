import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUserById(id: number): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

function findNewTodoId(list: Todo[]): number {
  const numbers = list.map(todo => todo.id);

  return Math.max(...numbers) + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const addTodo = (todo: Todo) => {
    setNewTodos(prevTodos => [...prevTodos, todo]);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value.trim().length > 0) {
      setIsTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    addTodo({
      id: findNewTodoId(newTodos),
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    });

    clear();
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
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })
            }
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
