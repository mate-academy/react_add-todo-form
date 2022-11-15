import './App.scss';
import cn from 'classnames';
import { FC, FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './typedefs';
import TodoList from './components/TodoList/TodoList';

const findUserById = (userId: number) => {
  return usersFromServer.find(user => userId === user.id) || null;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addTodo = (newTodo: TodoWithUser) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle('');
    setNewTodoUserId(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTodoTitle);
    setHasUserIdError(!newTodoUserId);

    if (newTodoTitle && newTodoUserId) {
      const newTodo: TodoWithUser = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: newTodoTitle,
        completed: false,
        userId: newTodoUserId,
        user: findUserById(newTodoUserId),
      };

      addTodo(newTodo);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="#" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              className={cn({ 'with-error': hasTitleError })}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={(event) => {
                setNewTodoTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
          </label>

          {hasTitleError && (
            <span className="error">
              {' Please enter a title'}
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              className={cn({ 'with-error': hasUserIdError })}
              value={newTodoUserId}
              onChange={(event) => {
                setNewTodoUserId(Number(event.target.value));
                setHasUserIdError(false);
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">
              {' Please choose a user'}
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="submitButton"
        >
          Add todo
        </button>
      </form>

      {/* <form action="/api/users" method="POST">
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
            />
          </label>

          <span className="error">{' Please enter a title'}</span>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select data-cy="userSelect">
              <option value="0" selected disabled>Choose a user</option>
            </select>
          </label>

          <span className="error">{' Please choose a user'}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form> */}

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
