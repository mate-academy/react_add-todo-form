import React, { useMemo, useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { prepareTodos } from './helper';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState(() => [...todosFromServer]);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(-1);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasHasUserIdError, setHasUserIdError] = useState(false);

  const addTodo = () => {
    setTodos(prev => (
      [
        ...prev,
        {
          userId,
          id: Math.max(...prev.map(todo => todo.id)),
          title: todoTitle,
          completed: false,
        },
      ]
    ));
  };

  const reset = () => {
    setTodoTitle('');
    setUserId(-1);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'todo-title':
        setHasTitleError(false);
        setTodoTitle(value);
        break;

      case 'todo-user-selector':
        setHasUserIdError(false);
        setUserId(+value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId !== -1 && todoTitle) {
      addTodo();
      reset();
    }

    if (!todoTitle) {
      setHasTitleError(true);
    }

    if (userId === -1) {
      setHasUserIdError(true);
    }
  };

  const preparedTodos = useMemo(() => (
    prepareTodos(todos, usersFromServer)
  ), [todos]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="App__title">Add todo form</h1>
        <form
          className="App__form form"
          onSubmit={handleSubmit}
        >
          <div className="form__item">
            <input
              id="todo-title"
              name="todo-title"
              type="text"
              className="form__todo-title"
              placeholder="Type todo"
              value={todoTitle}
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
            />

            {hasTitleError && (
              <div
                className="form__error"
              >
                Is empty
              </div>
            )}
          </div>

          <div className="form__item">
            <select
              id="todo-user-selector"
              name="todo-user-selector"
              className="form__user-selector"
              value={userId}
              onChange={handleChange}
            >
              <option value={-1}>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {hasHasUserIdError && (
              <div
                className="form__error"
              >
                No user selected
              </div>
            )}
          </div>

          <button
            type="submit"
            className="form__submit"
          >
            Add
          </button>
        </form>
        <TodoList todos={preparedTodos} />
      </div>
    </div>
  );
};

export default App;
