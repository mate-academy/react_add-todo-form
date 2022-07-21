import React, { useState } from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const App: React.FC = () => {
  const [userID, setUserId] = useState(0);
  const [getTask, setTask] = useState('');
  const [currentTodos, addTodo] = useState([...todos]);
  const [errorMsg, shouldThrowError] = useState(false);

  const errText = 'Please, enter ';

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTask(String(value));
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  const preparedTodos = [...currentTodos].map(todo => (
    {
      ...todo,
      user: [...users].find(user => user.id === todo.userId) || null,
    }
  ));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (getTask.trim().length && userID) {
      addTodo(current => ([
        ...current,
        {
          userId: userID,
          id: current[current.length - 1].id + 1,
          title: getTask.trim(),
          completed: false,
        }]
      ));

      setUserId(0);
      setTask('');
      shouldThrowError(false);
    } else {
      shouldThrowError(true);
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo</h1>
      <form className="App__form">
        <div className="App__error-block">
          <input
            type="text"
            placeholder="Write your task here"
            className="App__input"
            value={getTask}
            data-cy="titleInput"
            onChange={inputHandler}
          />

          {!getTask.trim().length && errorMsg
            && (
              <span className="App__err-msg">
                {`${errText}task title`}
              </span>
            )}
        </div>

        <div className="App__error-block">
          <select
            name="users"
            id="users"
            className="App__select"
            value={userID}
            data-cy="userSelect"
            onChange={selectHandler}
          >
            <option
              value={0}
              disabled={userID > 0}
            >
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>
          {!userID && errorMsg
            && (
              <span className="App__err-msg">
                {`${errText}user name`}
              </span>
            )}
        </div>

        <button
          type="submit"
          className="App__button"
          onClick={handleClick}
        >
          Add Task
        </button>
      </form>
      <TodoList props={preparedTodos} />
    </div>
  );
};

export default App;
