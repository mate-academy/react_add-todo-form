import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState([...todosFromServer]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUserIdError, setCurrentUserIdError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const getUserById = (userId: number) => {
    return usersFromServer.find(user => user.id === userId) || undefined;
  };

  const visibleTodos = currentTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  function getNewTodoId(todos: Todo[]) {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  const handlerChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    function sanitizeTitle(input: string) {
      return input.replace(/[^a-zA-Zа-яА-Я\s]/g, '');
    }

    const sanitizedTitle = sanitizeTitle(event.target.value);

    setTitle(sanitizedTitle);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserIdError(false);
    setCurrentUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setCurrentUserIdError(currentUserId === 0);

    if (title && currentUserId !== 0) {
      const newTodo = {
        id: getNewTodoId(currentTodos),
        title,
        userId: currentUserId,
        completed: false,
      };

      setCurrentTodos(allTodos => [...allTodos, newTodo]);
      setTitle('');
      setCurrentUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {`Title: `}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handlerChangeTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {`User: `}
            <select
              data-cy="userSelect"
              value={currentUserId}
              onChange={handleChangeUser}
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
          </label>
          {currentUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
