import './App.scss';
import { ChangeEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import { User } from './components/types/User';
import { getNewId } from './components/services/todo';

function getTodos(todos: Todo[]) {
  return todos.map(todo => {
    const findUserById = usersFromServer.find(
      (user: User) => user.id === todo.userId,
    );

    return {
      ...todo,
      user: findUserById || null,
    };
  });
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !title) {
      setHasUserIdError(!userId);
      setHasTitleError(!title);

      return;
    }

    setTodos([...todos, {
      id: getNewId(todos),
      title,
      completed: false,
      userId,
    }]);

    reset();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleId = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
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
          <label htmlFor="title">
            Title:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitle}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleId}
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

      <TodoList todos={getTodos(todos)} />
    </div>
  );
};
