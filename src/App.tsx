import React, { useState } from 'react';
import './App.css';
import todosFromApi from './api/todos';
import usersFromApi from './api/users';
import { PreparedTodosType } from './types/PreparedTodosType';
import TodoList from './components/TodoList/TodoList';

let preparedTodoList: PreparedTodosType[] = todosFromApi.map(task => {
  return {
    ...task,
    user: usersFromApi.find(user => user.id === task.userId) || null,
  };
});

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [validInput, setValidInput] = useState(true);
  const [selectedUser, setSelectedUser] = useState(0);
  const [validUser, setValidUser] = useState(true);

  const addTask = () => {
    if (input && selectedUser) {
      const newTask: PreparedTodosType = {
        userId: selectedUser,
        id: preparedTodoList.length + 1,
        title: input,
        completed: false,
        user: usersFromApi.find(user => user.id === selectedUser) || null,
      };

      preparedTodoList = [
        ...preparedTodoList,
        newTask,
      ];

      setInput('');
      setSelectedUser(0);
    }

    setValidInput(!!input);
    setValidUser(!!selectedUser);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        className="form"
        onSubmit={event => {
          event.preventDefault();
          addTask();
        }}
      >
        <label>
          <input
            type="text"
            name="addTask"
            placeholder="Task"
            data-cy="titleInput"
            value={input}
            onChange={event => setInput(event.target.value)}
          />

          {!validInput && (
            <p className="attention">Please enter your task</p>
          )}
        </label>

        <label>
          <select
            name="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(+event.target.value)}
          >
            <option value={0}>Choose user</option>
            {usersFromApi.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!validUser && (
            <p className="attention">Please choose user</p>
          )}
        </label>

        <button
          type="submit"
          className="button"
        >
          Add task
        </button>
      </form>
      <p>
        <TodoList todos={preparedTodoList} />
      </p>
    </div>
  );
};

export default App;
