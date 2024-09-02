import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import { getUserById } from './components/services/user-service';
import { getNewTodoId } from './components/services/todo-service';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleTitleCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      id: getNewTodoId(todos),
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);

    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            Title:
          </label>
          <input
            type="text"
            id="post-title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleCHange}
            data-cy="titleInput"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user-id">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="post-user-id"
            value={userId}
            onChange={handleUserId}
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
