import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer
    .map(todo => {
      const user = usersFromServer.find(
        currentUser => currentUser.id === todo.userId,
      );

      if (!user) {
        return null;
      }

      return {
        ...todo,
        user: user,
      };
    })
    .filter((todo): todo is Todo => todo !== null);

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const isTitleEmpty = !normalizedTitle;
    const isUserNotSelected = userId === 0;

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: normalizedTitle,
      userId: userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter todo title"
              onChange={event => {
                const value = event.target.value;
                const cleanValue = value.replace(
                  /[^a-zA-Z0-9\sа-яА-ЯіІїЇєЄґҐ]/g,
                  '',
                );

                setTitle(cleanValue);
                setHasTitleError(false);
              }}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(+event.target.value);
                setHasUserError(false);
              }}
              className={hasUserError ? 'is-danger' : ''}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {hasUserError && <span className="error">Please choose a user</span>}
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
