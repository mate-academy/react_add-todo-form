import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/Types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const todosId = initialTodos
  .map(todo => todo.id);

export const App = () => {
  const [selectId, setSelectId] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [todos] = useState(initialTodos);
  const [showUserError, setShowUserError] = useState(false);
  const [showTitleError, setShowTitleError] = useState(false);

  const getTodo = (): void => {
    const newTodo: Todo = {
      id: Math.max(...todosId) + 1,
      title: inputTitle,
      userId: +selectId,
      completed: false,
      user: getUser(+selectId),
    };

    todos.push(newTodo);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowUserError(!selectId);
    setShowTitleError(!inputTitle);

    if (selectId && inputTitle) {
      getTodo();
      setInputTitle('');
      setSelectId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => {
          handleOnSubmit(event);
        }}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={inputTitle}
              onChange={(event) => setInputTitle(event.target.value)}
            />
          </label>
          {showTitleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={selectId}
              onChange={(event) => setSelectId(event.target.value)}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(({ name, id }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}

            </select>
          </label>

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList newTodos={todos} />
    </div>
  );
};
