/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todos';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodos: Todo[] = todosFromServer.flatMap(todo => {
  const user = getUserById(todo.userId);

  return user ? [{...todo,user}]: [];
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const hasTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const hasUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = userId === 0;
    const selectedUser = getUserById(userId);

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty|| !selectedUser) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: selectedUser
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };


  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={title}
            onChange={hasTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id='user'
            data-cy="userSelect"
            value={userId}
            onChange={hasUserChange}
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

          {hasUserError && <span className="error">Please choose a user</span>}


        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
