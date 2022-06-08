/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';

import todosFrom from './api/todos';
import usersFrom from './api/users';

import { User, Todo } from './types';

import { TodoList } from './components/TodoList';

const prepareTodos = (users: User[], todos: Todo[]) => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId || null),

  }));
};

export const preparedTodos = prepareTodos(usersFrom, todosFrom);

const App: React.FC = () => {
  const [preparedUsers, setPreparedUsers] = useState(preparedTodos);
  const [inputedTitle, setInputedTitle] = useState('');
  const [createdId, setCreatedId] = useState(0);
  const [chosenUserId, setChosenUserId] = useState(5);

  const addUser = () => {
    console.log('user added');
    setCreatedId(prepareTodos.length + 1);
    const createdUser = {
      title: inputedTitle,
      id: createdId,
      user: usersFrom.find(user => user.id === chosenUserId),
      userId: chosenUserId,
      completed: false,
    };

    setPreparedUsers([...preparedTodos, createdUser]);
  };

  return (
    <>
      <div className="App">
        <h1>Static list of todos</h1>
        <h3>Add a new user</h3>
        <div>
          <form>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={inputedTitle}
              onChange={(event) => {
                setInputedTitle(event.target.value);
              }}
            />

            <select
              name="users"
              defaultValue={chosenUserId}
              onChange={(event) => {
                setChosenUserId(+event.target.value);
              }}
            >
              {usersFrom.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addUser}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <TodoList todos={preparedUsers} />
      </div>
    </>
  );
};

export default App;
