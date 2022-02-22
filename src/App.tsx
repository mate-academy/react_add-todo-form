import React, { useState } from 'react';

import TodoList from './components/TodoList/TodoList';

import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => {
  const todoUser = users.find(user => user.id === todo.userId);

  if (!todoUser) {
    throw new Error('no user found');
  }

  return {
    title: todo.title,
    completed: todo.completed,
    user: todoUser,
  };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);
  const [isDirty, setIsDirty] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    value = value.replace(/[^ 0-9a-zA-Zа-яА-ЯёЁ]+/ig, '');
    setTitle(value);
  };

  const onTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = users.find(searchedUser => searchedUser.name === userName);

    setIsDirty(true);

    if (title && user) {
      const newTodo = {
        id: todos[todos.length - 1].id + 1,
        title,
        completed: false,
        user,
      };

      setVisibleTodos([...visibleTodos, newTodo]);
      setTitle('');
      setUserName('');
      setIsDirty(false);
    }
  };

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList preparedTodos={visibleTodos} />
      <form
        className="form"
        onSubmit={onTodoAdd}
      >
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          {!title && isDirty && <div className="error">Please enter the title</div>}
        </label>
        <select
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        >
          <option value="">
            Choose a user
          </option>
          {users.map(opUser => (
            <option
              key={opUser.id}
              value={opUser.name}
            >
              {opUser.name}
            </option>
          ))}
        </select>
        {!userName && isDirty && <span className="error">Please choose a user</span>}
        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
