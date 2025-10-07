import { TodoList } from '../TodoList';
import './App.scss';

import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

function getUserById(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  if (!foundUser) {
    throw new Error(`User with id ${userId} not found`);
  }

  return foundUser;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);

  const [userId, setuserId] = useState(0);
  const [hasUserIdError, sethasUserIdError] = useState(false);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setuserId(0);

    sethasTitleError(false);
    sethasUserIdError(false);
  };

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value);
    sethasTitleError(false);
  };

  const handleUserIdChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setuserId(+(event.target as HTMLSelectElement).value);
    sethasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      sethasTitleError(true);
    }

    if (!userId) {
      sethasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const user = getUserById(userId);

    if (!user) {
      sethasUserIdError(true);

      return;
    }

    addTodo({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: user,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor="titleInput">Title</label>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="Enter the title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>
        <br></br>
        <label htmlFor="userSelect">Subject</label>
        <div className="field">
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserIdChange}
            required
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <br></br>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
