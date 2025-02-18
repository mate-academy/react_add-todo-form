import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

const todosWithUserId: Todo[] = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUserId);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

  const onAdd = (newTodo: Todo) => {
    const currentTodo = {
      ...newTodo,
      id: maxId + 1,
    };

    setTodos(currentTodos => [...currentTodos, currentTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todos-title">Title:</label>
          <input
            placeholder="Enter a title"
            id="todos-title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />{' '}
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todos-user">User:</label>
          <select
            data-cy="userSelect"
            id="todos-user"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
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

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
