import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types.ts/todo';
import classNames from 'classnames';
import { User } from './types.ts/users';

export const App: React.FC = () => {
  function getUserById(userId: number): User | null {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodos = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);
    if (!title || !userId) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    addTodos({
      title,
      userId,
      id: maxId + 1,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="box"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title:
            <input
              id="todo-title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User:
          </label>
          <div
            className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              data-cy="userSelect"
              id="user-select"
              value={userId}
              onChange={handleUserIdChange}
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

            {hasUserIdError && (
              <span className="error">Please choose a user</span>
            )}
          </div>
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
