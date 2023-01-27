import './App.scss';
import React, { useState } from 'react';
import { Todo, User } from './react-app-env';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todosWithUser, setTodosWithUser] = useState<Todo[]>(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserById, setSelectedUserById] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setSelectedUserById(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!todoTitle);
    setHasUserIdError(!selectedUserById);

    const user = getUser(selectedUserById);

    const newId = Math.max(...todosWithUser.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title: todoTitle,
      completed: false,
      userId: selectedUserById,
      user,
    };

    if (newTodo && selectedUserById && todoTitle) {
      setTodosWithUser((currentTodos) => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            placeholder="Enter a title"
            onChange={(event) => {
              setTodoTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUserById}
            onChange={event => {
              setSelectedUserById(+event.target.value);
              setHasUserIdError(false);
            }}
            data-cy="userSelect"

          >
            <option value="0" disabled>Choose a user</option>
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

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUser} />
    </div>
  );
};
