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

  const errText = 'Please, enter task title and choose a user to add new TODO';

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
      user: users.find(user => user.id === todo.userId) || null,
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
        <input
          type="text"
          placeholder="Write your task here"
          className="App__input"
          value={getTask}
          data-cy="titleInput"
          onChange={inputHandler}
        />
        <select
          name="users"
          id="users"
          className="App__select"
          data-cy="userSelect"
          onChange={selectHandler}
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="App__button"
          onClick={handleClick}
        >
          Add Task
        </button>
      </form>
      {errorMsg
        ? <span className="App__err-msg">{errText}</span>
        : <span className="App__err-msg" />}
      <TodoList props={preparedTodos} />
    </div>
  );
};

export default App;
