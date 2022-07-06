import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './api/components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => {
  const todoList = {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };

  return todoList;
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserID] = useState(0);
  const [completed] = useState(false);
  const [todosList, setTodosList] = useState(preparedTodos);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0) {
      setUserError(true);
    }

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId && title.trim()) {
      const newTodoItem = {
        id: todos.length + 1,
        title,
        userId,
        completed,
        user: users.find((user => user.id === userId)) || null,
      };

      setTodosList([...todosList, newTodoItem]);
      setUserID(0);
      setTitle('');
    }
  };

  const validationTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-я0-9]/g, ''));
    setTitleError(false);
  };

  const validationUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <div className="App__content">
        <form
          className="App__form"
          onSubmit={addTodo}
        >
          <label className="App__title-block" htmlFor="title">
            Title:
            <input
              className="App__title-input"
              type="text"
              id="title"
              value={title}
              onChange={validationTitle}
            />
          </label>

          <select
            className="App__select"
            name="addUser"
            value={userId}
            onChange={validationUser}
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
          {userError && (
            <div className="App__error App__error--user">
              Please choose a user
            </div>
          )}
          {titleError && (
            <div className="App__error App__error--title">
              Please enter the title
            </div>
          )}

          <button
            className="App__button"
            type="submit"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </form>

        <TodoList preparedTodos={todosList} />
      </div>

    </div>
  );
};

export default App;
