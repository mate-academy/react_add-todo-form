import React, { Fragment, useState } from 'react';
import './App.css';

import users from './api/users';

const App: React.FC = () => {
  const [todoInputValue, setTodoInputValue] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [inputValidation, setInputValidation] = useState([false, false]);
  const [todoList, setTodoList] = useState(
    [
      {
        userId: 1,
        id: 1,
        title: 'Write HTML code',
        completed: false,
      },
    ],
  );

  function selectUserId(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectUser(+event.target.value);
  }

  function addTodo() {
    if (selectUser === 0) {
      setInputValidation([true, false]);

      return;
    }

    if (todoInputValue.length === 0) {
      setInputValidation([false, true]);

      return;
    }

    const newList = [...todoList];

    newList.unshift(
      {
        userId: selectUser,
        id: newList.length + 1,
        title: todoInputValue,
        completed: false,
      },
    );

    setTodoList(newList);

    setSelectUser(0);
    setTodoInputValue('');
    setInputValidation([false, false]);
  }

  return (
    <div className="App">
      <h1>TODO list</h1>

      <div className="input_wrap">
        <div
          className={inputValidation[0] ? 'input_error' : ''}
        >
          <select
            value={selectUser}
            name="choice"
            onChange={(event) => {
              selectUserId(event);
            }}
          >
            <option
              value="0"
            >
              Choose a user
            </option>
            {users.map((user) => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className={`${inputValidation[1] ? 'input_error' : ''} input_error_user`}
        >
          <input
            type="text"
            value={todoInputValue}
            onChange={(e) => {
              setTodoInputValue(e.currentTarget.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            addTodo();
          }}
          type="button"
        >
          add doto
        </button>
      </div>

      {todoList.map((todo) => {
        return (
          <div className="todo_card" key={todo.id}>
            <span>{todo.title}</span>
            <div className="todo_user_info">
              {users.map((user) => {
                return (
                  <Fragment key={user.id}>
                    {todo.userId === user.id
                      ? (
                        <>
                          <span>
                            {user.name}
                          </span>
                          <span>
                            {user.email}
                          </span>
                        </>
                      )
                      : null}
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
