import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDo } from './types/ToDo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import users from './api/users';

const preparedTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => (todo.userId === user.id)) || null,
}));

export const App = () => {
  const [todos, setToDos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);


  const clearForm = () => {
    setTitle('');
    setUserId('0');
  };

  const errors = () => {
    if (!title) {
      setTitleError(true);
    }

    if(userId === '0') {
      setUserError(true)
    }
  };

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    errors();
    clearForm();

    const newTodo = {
      id: (Math.max(...todos.map(todo => todo.id)) + 1),
      title,
      completed: false,
      userId: +userId,
      user: usersFromServer.find(user => user.id === +userId) || null,
    };
    console.log(newTodo);

    setToDos(state => {
      return (
        [...state,
          newTodo,]
      )
    });

    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(event.target.value);
            }}
          >
            <option
              value="0" disabled>Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
