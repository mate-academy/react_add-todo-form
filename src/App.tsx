import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const getNextTodoId = (todos: Todo[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [availableTodos, setAvailableTodos] = useState(todos);

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (value: string) => {
    setIsErrorTitle(false);
    setTitle(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    setIsErrorUser(!userId);
    setIsErrorTitle(!trimedTitle);

    if (!trimedTitle || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(availableTodos),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setAvailableTodos(currentTodos => [...currentTodos, newTodo]);

    clearForm();
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
          <label>
            <span>Title: </span>
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
            />
          </label>

          {isErrorTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              name="user"
              id="userSelect"
              value={userId}
              onChange={(event) => {
                setIsErrorUser(false);
                setUserId(+event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isErrorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={availableTodos} />
    </div>
  );
};
