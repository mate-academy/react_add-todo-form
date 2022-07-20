/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, FormEvent } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
// import { link } from 'fs';

const App: React.FC = () => {
  const [todosArray, setTodos] = useState(todos);
  const [todoName, setTodoTitle] = useState('');
  const [userID, setUserID] = useState(0);
  const [userName, setUserName] = useState('choose user');
  const [isTitleValid, setTitleValid] = useState(true);
  const [isUserValid, setUserValid] = useState(true);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValid(true);
    setTodoTitle(event.target.value);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserValid(true);
    setUserName(event.target.value);
    setUserID(event.target.selectedIndex);
  };

  const sumbitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoName && userID) {
      const todosArrayCopy = [...todosArray];

      todosArrayCopy.push(
        {
          userId: userID,
          id: todosArrayCopy.length + 1,
          title: todoName,
          completed: false,
        },
      );

      setTodos(todosArrayCopy);
      setTitleValid(true);
      setUserValid(true);
      setTodoTitle('');
      setUserID(0);
      setUserName('choose user');
    }

    if (!todoName) {
      setTitleValid(false);
    }

    if (!userID) {
      setUserValid(false);
    }
  };

  return (
    <div className="App">
      <form
        action=""
        onSubmit={(event) => {
          sumbitHandler(event);
        }}
      >
        <input
          name="todoName"
          placeholder="Todo title"
          type="text"
          data-cy="titleInput"
          value={todoName}
          onChange={(event) => {
            inputHandler(event);
          }}
        />
        {isTitleValid
          ? ''
          : <span className="Validation-err"> - Please enter a title</span>}
        <br />
        <select
          name="chooseUser"
          value={userName}
          data-cy="userSelect"
          onChange={(event) => {
            selectHandler(event);
          }}
        >
          <option value="">{userName}</option>
          {users.map(user => (
            <option key={user.id} value={user.name}>{user.name}</option>
          ))}
        </select>
        {isUserValid
          ? ''
          : <span className="Validation-err"> - Please choose a user</span>}
        <br />
        <button type="submit">Add todo</button>
      </form>

      <h1>Add todo form</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <ul>
        {
          todosArray.map(todo => {
            const { id, title, completed } = todo;
            const currentUser = users.find(user => user.id === todo.userId);

            return (
              <li key={id}>
                <div>{title}</div>
                <div>{completed ? 'completed' : 'not completed'}</div>
                <div>
                  {currentUser ? currentUser.name : null}
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default App;
