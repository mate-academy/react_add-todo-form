import React, { useState } from 'react';
import './App.css';
import { Todo } from '../types';

import users from '../api/users';
import todos from '../api/todos';
import TodoList from '../TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [userName, setuserName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [finalTodos, setFinalTodos] = useState<Todo[]>(preparedTodos);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorUser, setErrorUser] = useState<string>();

  const userHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setuserName(event.target.value);
    setErrorUser('');
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedSymbols = '0987654321qwertyuiopasdfghjklzx'
      + 'cvbnmйцукенгшщзхъфывапролджэячсмитьбю ';
    const allowedSymbolsUppercase = allowedSymbols.toLocaleUpperCase();

    const lastLetter = event.target.value[event.target.value.length - 1];

    if (
      allowedSymbols.includes(lastLetter)
      || allowedSymbolsUppercase.includes(lastLetter)
      || event.target.value.length === 0
    ) {
      setTitle(event.target.value);
      setErrorTitle('');
    }
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let error = false;

    const trimmedTitle = title.trim();

    if (userName === '') {
      setErrorUser('Please choose a user');
      error = true;
    } else {
      setErrorUser('');
    }

    if (trimmedTitle === '') {
      setErrorTitle('Please enter the title');
      error = true;
    } else {
      setErrorTitle('');
    }

    if (error) {
      return;
    }

    if (userName && title) {
      setuserName('');
      setTitle('');
    }

    const todosCopy = [...finalTodos];

    const user = users.find(userData => userData.name === userName);
    const userId = user ? user.id : 0;

    todosCopy.push({
      userId,
      id: todosCopy.length,
      title,
      completed: false,
      user: user || null,

    });
    setFinalTodos(todosCopy);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <div className="App_item">
        <form className="form">
          <label>
            <span className="title"> Add todo title:</span>
            <input
              type="text"
              name="title"
              className="inputStyle"
              value={title}
              onChange={titleHandler}
            />
          </label>
          <div className="error">
            {errorTitle}
          </div>
          <select
            value={userName}
            onChange={userHandler}
            className="inputStyle"
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="error">
            {errorUser}
          </div>
          <button
            type="button"
            onClick={submitHandler}
            className="btn"
          >
            Add
          </button>
        </form>
        <TodoList todos={finalTodos} />
      </div>
    </div>
  );
};

export default App;
