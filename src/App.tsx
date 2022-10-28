import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [user, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const validateForm = () => {
    if (!user || !title) {
      if (!user) {
        setIsUserError(true);
      }

      if (!title) {
        setIsTitleError(true);
      }
    }

    return user && title;
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setTodos(
      [
        ...todos,
        {
          id: new Date(),
          user: usersFromServer.find(currUser => currUser.id === user),
          title,
          completed: false,
          userId: user,
        },
      ],
    );

    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmitForm}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value.trim());
                setIsTitleError(false);
              }}
            />
            {isTitleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={user}
              onChange={(event) => {
                setUser(+event.currentTarget.value);
                setIsUserError(false);
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(currentUser => {
                return (
                  <option
                    key={currentUser.id}
                    value={currentUser.id}
                  >
                    {currentUser.name}
                  </option>
                );
              })}
            </select>
            {isUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
