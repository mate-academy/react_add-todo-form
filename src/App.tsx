import './App.scss';
import { FC, useState } from 'react';
import { TodoList } from './components/TodoList';
import { prepareTodos, getNewTodoId, getUserById } from './helpers';
import { TodoWithUser } from './types/types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const preparedTodos = prepareTodos(todosFromServer, usersFromServer);

export const App: FC = () => {
  const [userSelect, setUserSelect] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [usersError, setUsersError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userSelect) {
      setUsersError(true);
    }

    if (!userSelect || !title) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(usersFromServer, Number(userSelect)),
      title: title.trim(),
      userId: Number(userSelect),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserSelect(0);
  };

  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserSelect(Number(event.target.value));
    setUsersError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              data-cy="titleInput"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              name="user"
              id="user"
              value={userSelect}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {usersError && (
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
