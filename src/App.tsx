import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todos';
import { Users } from './components/types/User';

function getUser(userId: number): Users | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const onAdd = () => {
    const newTodoObj = {
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
    };

    setTodoList(previous => {
      return [...previous, newTodoObj];
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorUser(!userId);
    setErrorTitle(!title);

    if (!title || !userId) {
      return;
    }

    onAdd();

    setTitle('');
    setUserId(0);
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
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
          </label>
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setErrorUser(false);
              }}
            >
              <option
                value={0}
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
          </label>

          {errorUser && (<span className="error">Please enter a title</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary"

        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
