import React, { useState } from 'react';
import './App.css';
import { TodosList } from './components/TotosList/TodosList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');

  const selectedUser = users.find(user => user.name === selectValue);

  let selectedTodos = todos.map(todo => {
    const user = users.find(person => person.id === todo.userId) || null;

    return { ...todo, user };
  });

  if (selectedUser !== undefined) {
    selectedTodos = [...selectedTodos].filter(
      todo => todo.userId === selectedUser.id,
    );
  }

  const newTodo = () => {
    if (inputValue === '') {
      setErrorTitle('title');

      return;
    }

    if (selectedUser === undefined) {
      setErrorUser('user');

      return;
    }

    const todo = {
      userId: selectedUser.id,
      id: todos.length + 1,
      title: inputValue,
      completed: false,
    };

    todos.push(todo);
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>
      <div className="select">
        <label>
          Choose an user
          <select
            className="select__item"
            value={selectValue}
            onChange={(event) => {
              setSelectValue(event.target.value);
              setErrorUser('');
            }}
          >
            <option value="">Choose an user</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
        </label>
      </div>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          newTodo();
          setInputValue('');
        }}
      >
        <input
          className="input"
          type="text"
          name="todo"
          placeholder="Enter your todo"
          value={inputValue}
          onChange={event => {
            setInputValue(
              event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''),
            );
            setErrorTitle('');
          }}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
      {(errorUser !== '') && (<ErrorMessage error={errorUser} />)}
      {(errorTitle !== '') && (<ErrorMessage error={errorTitle} />)}

      <div className="todos">
        <h2 className="todos__title">
          Todos list.
        </h2>
        <TodosList todos={selectedTodos} />
      </div>
    </div>
  );
};

export default App;
