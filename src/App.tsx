import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [handleUser, setHandleUser] = useState('0');
  const [handleTitle, setHandleTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [handleUserError, setHandleUserError] = useState(false);
  const [handleTitleError, setHandleTitleError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandleTitle(event.target.value);
    setHandleTitleError(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHandleUser(event.target.value);
    setHandleUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isUserInvalid = handleUser === '0';
    const isTitleInvalid = handleTitle.trim() === '';

    setHandleUserError(isUserInvalid);
    setHandleTitleError(isTitleInvalid);

    if (isUserInvalid || isTitleInvalid) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: handleTitle,
      completed: false,
      userId: Number(handleUser),
    };

    setTodos([...todos, newTodo]);
    setHandleTitle('');
    setHandleUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title
          </label>

          <div className="control">
            <input
              id="todo-title"
              type="text"
              data-cy="titleInput"
              className={`input ${handleTitleError ? 'is-danger' : ''}`}
              placeholder="Todo title"
              value={handleTitle}
              onChange={onTitleChange}
            />
          </div>

          {handleTitleError && (
            <p className="error" data-cy="titleErrorMessage">
              Please enter a title
            </p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user">
            User
          </label>

          <div className="control">
            <div className={`select ${handleUserError ? 'is-danger' : ''}`}>
              <select
                id="todo-user"
                data-cy="userSelect"
                value={handleUser}
                onChange={onUserChange}
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
            </div>
          </div>

          {handleUserError && (
            <p className="error" data-cy="userErrorMessage">
              Please choose a user
            </p>
          )}
        </div>

        <button
          type="submit"
          className="button is-primary"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
