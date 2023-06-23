import './App.scss';
import { FC, useState } from 'react';
import { getNewId, findUserById, preparedTodo } from './helpers';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import { Todo } from './types';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodo);

  const [queryTitle, setQueryTitle] = useState('');
  const [userId, setuserId] = useState(0);

  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const selectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserError('');
    setuserId(+value);
  };

  const handleQueryTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleError('');
    setQueryTitle(value);
  };

  const clearForm = () => {
    setQueryTitle('');
    setuserId(0);
    setTitleError('');
    setUserError('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!queryTitle || !userId) {
      if (!userId) {
        setUserError('Please choose a user');
      }

      if (!queryTitle) {
        setTitleError('Please enter a title');
      }

      return;
    }

    setTodos(prevTodos => {
      const newTodo = {
        id: getNewId(prevTodos),
        title: queryTitle.trim(),
        completed: false,
        userId,
        user: findUserById(+userId),
      };

      return [...prevTodos, newTodo];
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={queryTitle}
              onChange={handleQueryTitle}
            />
          </label>
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={selectedUser}
            >
              <option value={0} disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
