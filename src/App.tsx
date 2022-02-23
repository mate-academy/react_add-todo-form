import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [ExtraTodos, setExtraTodos] = useState(todos);
  const [errorToDo, setErrorToDo] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const addTodos = () => {
    const newTodos = {
      userId,
      id: ExtraTodos.length + 1,
      title,
      completed: false,
    };

    setErrorToDo(!title);
    setErrorUser(!userId);

    if (userId && title) {
      setExtraTodos(curentExtraTodos => [...curentExtraTodos, newTodos]);

      setTitle('');
      setUserId(0);
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodos();
  };

  const preparedTodos = ExtraTodos.map((todo) => ({
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  }));

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <form
        onSubmit={onFormSubmit}
        className="form"
      >
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value.trim());
            setErrorToDo(false);
          }}
          placeholder="Enter ToDo"
        />
        <select
          value={userId}
          onChange={(event) => {
            setUserId(+event.target.value);
            setErrorUser(false);
          }}
        >
          <option value="0" disabled>Select user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
        <button
          type="submit"
        >
          add
        </button>
      </form>
      {errorToDo && <div className="error">Write a ToDo!!!</div>}
      {errorUser && <div className="error">Choose a user!!!</div>}
      <TodoList preparedTodos={preparedTodos} />
    </div>
  );
};

export default App;
