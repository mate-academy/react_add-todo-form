import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) || null,
  }));

  const [todoTitle, setTodoTitle] = useState('');
  const [userSelect, setUseSelect] = useState('');
  const [todoList, setTodoList] = useState([...preparedTodos]);
  const [subbmited, setSubbmited] = useState(false);

  const resetForm = () => {
    setSubbmited(false);
    setTodoTitle('');
    setUseSelect('');
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = users.find(user => userSelect === user.username)?.id || 0;
    const todoId = Date.now();

    if (!userSelect || !todoTitle.trim()) {
      setSubbmited(true);
    } else {
      setTodoList((prev) => [
        ...prev,
        {
          user: users.find(user => userSelect === user.username) || null,
          userId,
          id: todoId,
          title: todoTitle,
          completed: false,
        },
      ]);

      resetForm();
    }
  };

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value
      .replace(/([^a-zA-Z0-9а-яА-Я ])/g, '');

    setTodoTitle(value);
  };

  return (
    <div className="App">
      <h1>Add new ToDo</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <form
        className="form-add-todo"
        onSubmit={addTodo}
      >
        <label
          className="form-add-todo__label-input"
        >
          Title
          {' '}
          <input
            type="text"
            className="form-add-todo__label-input__textarea"
            placeholder="Write a title for your ToDo"
            value={todoTitle}
            onChange={onInputChange}
          />
        </label>
        {!todoTitle.trim() && subbmited && (
          <span
            className="form-add-todo__err-title"
          >
            Please enter the title
          </span>
        )}

        <select
          className="form-add-todo__select"
          value={userSelect}
          onChange={(e) => setUseSelect(e.target.value)}
        >
          <option
            value=""
          >
            Choose a user name
          </option>
          {users.map(user => (
            <option
              key={user.username}
              value={user.username}
            >
              {user.username}
            </option>
          ))}
        </select>
        {!userSelect && subbmited && (
          <span
            className="form-add-todo__span"
          >
            Please choose a user
          </span>
        )}

        <button
          type="submit"
          className="form-add-todo__button"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todoList}
      />
    </div>
  );
};

export default App;
