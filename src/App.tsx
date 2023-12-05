import { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { PreparedTodo, Todo } from './types';

function getUserById(userIdRecived: number) {
  return (
    usersFromServer.find((currentUser) => currentUser.id === userIdRecived)
    || null
  );
}

function getPreparedTodos(todosRecived: Todo[]) {
  return todosRecived.map((todo) => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelectedId, setUserSelectedId] = useState(0);

  const [preparedTodos, setPreparedTodos] = useState<PreparedTodo[]>(
    getPreparedTodos(todosFromServer),
  );

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const resetForm = (): void => {
    setTitle('');
    setUserSelectedId(0);
  };

  const getNewTodoId = (): number => {
    const maxId = Math.max(...preparedTodos.map(preparedTodo => (
      preparedTodo.id
    )));

    return maxId + 1;
  };

  const addNewTodo = (): void => {
    const user = usersFromServer.find(userFromServer => (
      userFromServer.id === userSelectedId
    )) || null;

    const newTodo = {
      id: getNewTodoId(),
      title,
      completed: false,
      userId: userSelectedId,
      user,
    };

    setPreparedTodos(currentPreparedTodos => (
      [...currentPreparedTodos, newTodo]
    ));

    resetForm();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userSelectedId);

    if (!title || !userSelectedId) {
      return;
    }

    addNewTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="titleInput">
            <span>Title: </span>
            <input
              type="text"
              id="titleInput"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
          </label>

          {
            hasTitleError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label htmlFor="userSelector">
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userSelectedId}
              onChange={event => {
                setUserSelectedId(+event.target.value);
                setHasUserError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map((userFromServer) => (
                <option
                  key={userFromServer.id}
                  value={userFromServer.id}
                >
                  {userFromServer.name}
                </option>
              ))}
            </select>
          </label>

          {
            hasUserError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
