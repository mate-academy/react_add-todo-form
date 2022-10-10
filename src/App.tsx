import React, { useState, FormEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);

  const [titleFull, setTitleFull] = useState(true);
  const [userChosen, setUserChosen] = useState(true);

  // eslint-disable-next-line max-len
  const [todoFromServerState, setTodoFromServerState] = useState(todosFromServer);

  const [todoId, setTodoId] = useState(
    Math.max(...todoFromServerState.map(todo => todo.id)),
  );

  const toDosUser = todoFromServerState.map((todo) => {
    return {
      ...todo,
      user: usersFromServer
        .find((userFromId): boolean => userFromId.id === todo.userId),
    };
  });

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleFull(!!titleInput);
    setUserChosen(!!userSelect);

    if (titleInput && userSelect) {
      setTodoId((prevState) => prevState + 1);

      setTodoFromServerState((prevState) => [
        ...prevState,
        {
          title: titleInput,
          id: todoId,
          userId: Number(userSelect),
          completed: false,
        },
      ]);

      setTitleInput('');
      setUserSelect(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => submitForm(event)}
      >
        <div>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            value={titleInput}
            onChange={(event => setTitleInput(
              event.target.value
                .replace(/[^a-z\s\d]/gi, ''),
            ))}
          />

          {titleFull || (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div>
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={(event => setUserSelect(
              Number(event.target.value),
            ))}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
          {userChosen || (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"

        >
          Add
        </button>
      </form>

      <TodoList
        todos={toDosUser}
      />
    </div>
  );
};
