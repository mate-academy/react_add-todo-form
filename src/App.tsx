import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [titleFull, setTitleFull] = useState(true);
  const [userChosen, setUserChosen] = useState(true);
  const [todoId, setTodoId] = useState(
    Math.max(...todosFromServer.map(todo => todo.id)),
  );

  const toDosUser = todosFromServer.map((todo) => {
    return {
      ...todo,
      user: usersFromServer
        .find((userFromId): boolean => userFromId.id === todo.userId),
    };
  });

  class AddedTodos {
    completed = false;

    id = todoId;

    constructor(
      public title: string,
      public userId: number,
    ) {}
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          setTitleFull(!!titleInput);
          setUserChosen(!!userSelect);

          if (titleInput && userSelect) {
            setTodoId(todoId + 1);

            todosFromServer.push(new AddedTodos(
              titleInput,
              Number(userSelect),
            ));

            setTitleInput('');
            setUserSelect(0);
          }
        }}
      >
        <div className="field">
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

        <div className="field">
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
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
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
