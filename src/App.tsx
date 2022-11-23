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
  const [errorTitle, setErrorTitle] = useState(0);
  const [errorUser, setErrorUser] = useState(0);

  function Errors() {
    if (titleAdd === '') {
      setErrorTitle(1);
    }

    if (userIdAdd === 0) {
      setErrorUser(1);
    }
  }

  function handleAdd(newUser: number, newTitle: string): Todo[] {
    if (errorTitle === 0 && errorUser === 0) {
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
      setErrorTitle(0);
      setErrorUser(0);
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
              setErrorTitle(0);
            }}
          />
          {errorTitle === 1
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userIdAdd}
            onChange={(event) => {
              setUserId(+event.target.value);
              setErrorUser(0);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((oneUser) => (
              <option
                key={oneUser.id}
                value={oneUser.id}
              >
                {oneUser.name}
              </option>
            ))}
          </select>

          {errorUser === 1
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
