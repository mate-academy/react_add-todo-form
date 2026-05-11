import { FormEvent, useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

type User = (typeof usersFromServer)[number];

type Todo = (typeof todosFromServer)[number] & {
  user: User;
};

function getTodoUser(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

function prepareTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getTodoUser(todo.userId) as User,
  }));
}

function getNextTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id), 0) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(prepareTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedUser = getTodoUser(+userId);
    const shouldShowTitleError = title.trim() === '';
    const shouldShowUserError = !selectedUser;

    setHasTitleError(shouldShowTitleError);
    setHasUserError(shouldShowUserError);

    if (shouldShowTitleError || shouldShowUserError) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: getNextTodoId(currentTodos),
        title,
        completed: false,
        userId: selectedUser.id,
        user: selectedUser,
      },
    ]);

    setTitle('');
    setUserId('0');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <span className="label">Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span className="label">User: </span>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>

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
