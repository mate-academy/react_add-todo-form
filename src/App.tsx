import './App.scss';
import { ToDo } from './components/types';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [enteredTitle, setTitle] = useState('');
  const [choosenUser, setUser] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todos, setTodos] = useState<ToDo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }));
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = enteredTitle.trim();
    const isTitleEmpty = trimmed === '';
    const isUserNotChosen = choosenUser === '0';

    setTitleError(isTitleEmpty);
    setUserError(isUserNotChosen);

    const ids = todos.map(elem => elem.id);

    const newTodo: ToDo = {
      id: Math.max(...ids) + 1,
      title: trimmed,
      completed: false,
      userId: Number(choosenUser),
      user: getUserById(Number(choosenUser)),
    };

    if (isTitleEmpty === false && isUserNotChosen === false) {
      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <p>Title:</p>
          <input
            type="text"
            data-cy="titleInput"
            value={enteredTitle}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <p>User:</p>
          <select
            data-cy="userSelect"
            value={choosenUser}
            onChange={event => {
              setUser(event.target.value);
              setUserError(false);
            }}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
