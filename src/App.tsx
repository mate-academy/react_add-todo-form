import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

function getNewPostId(posts: Todo[]) {
  return Math.max(...posts.map(post => post.id)) + 1;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const isEmpty = !title.trim().length;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title || isEmpty);
    setHasUserIdError(!userId);

    if (!title || !userId || isEmpty) {
      return;
    }

    const newTodo = {
      id: getNewPostId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
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
          <label htmlFor="post-title">Title: </label>
          <input
            id="post-title"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="post-id">User: </label>
          <select
            id="post-id"
            value={userId}
            data-cy="userSelect"
            onChange={handleUserIdChange}
          >
            <option value="0">
              Choose a user
            </option>

            {usersFromServer.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
