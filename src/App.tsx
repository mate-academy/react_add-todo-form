import React, { useState } from 'react';
import { TodoList } from './Components/TodoList/TodoList';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [todosToShow, setTodosToShow] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const addTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleError(true);
    }

    if (!userId) {
      setIsUserError(true);
    }

    if (title.trim() && userId) {
      const newTodo = {
        userId,
        id: Math.max(...todosToShow.map(todo => todo.id), 0) + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      };

      setTodosToShow([...todosToShow, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const addTodoUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form
        className="App__form form"
        onSubmit={addTodo}
      >
        <div className="container">
          <input
            className="form__title-input"
            type="text"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={addTodoTitle}
          />
          {isTitleError && (
            <span
              className="form__error"
            >
              Please enter the title
            </span>
          )}
        </div>
        <div className="container">
          <select
            className="form__user-select"
            name="user"
            value={userId}
            onChange={addTodoUserId}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>
            {
              users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {isUserError && (
            <span
              className="form__error"
            >
              Please choose a user
            </span>
          )}
        </div>
        <button
          className="form__add-button"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todos={todosToShow} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
};

export default App;
