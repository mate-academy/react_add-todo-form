import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userIdAdd, setUserId] = useState(0);
  const [titleAdd, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  function Errors() {
    if (titleAdd === '') {
      setErrorTitle(true);
    }

    if (userIdAdd === 0) {
      setErrorUser(true);
    }
  }

  function handleAdd(newUser: number, newTitle: string): Todo[] {
    if (!errorTitle && !errorUser) {
      let maxId = 0;

      todos.forEach(element => {
        maxId = Math.max(maxId, element.id);
      });

      const newTodo = {
        id: maxId + 1,
        userId: newUser,
        title: newTitle,
        completed: false,
        user: getUser(newUser),
      };

      todos.push(newTodo);
      setTitle('');
      setUserId(0);
      setErrorTitle(false);
      setErrorUser(false);
    }

    return todos;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        action="/api/users"
        onSubmit={(event) => {
          handleAdd(userIdAdd, titleAdd);
          event.preventDefault();
        }}
      >
        <div className="field">
          Title:
          <input
            type="text"
            value={titleAdd}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userIdAdd}
            onChange={(event) => {
              setUserId(+event.target.value);
              setErrorUser(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errorUser
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            Errors();
          }}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todosArr={todos} />
      </section>
    </div>
  );
};
