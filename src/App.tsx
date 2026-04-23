import { ChangeEvent, FormEvent, useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

const titlePattern = /[^a-zA-Z\u0400-\u04FF0-9 ]/g;
const usersById = new Map(usersFromServer.map(user => [user.id, user]));

const todosWithUsers: Todo[] = todosFromServer.map(todo => {
  const user = usersById.get(todo.userId);

  if (!user) {
    throw new Error(`User ${todo.userId} was not found`);
  }

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(titlePattern, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const isTitleValid = normalizedTitle.length > 0;
    const selectedUser = usersFromServer.find(user => user.id === userId);

    setHasTitleError(!isTitleValid);
    setHasUserError(!selectedUser);

    if (!isTitleValid || !selectedUser) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
        title: normalizedTitle,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      },
    ]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>

          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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
