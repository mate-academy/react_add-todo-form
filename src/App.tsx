/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './App.scss';
import classnames from 'classnames';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { TodoType } from './react-app-env';

const preparedTodos: TodoType[] = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }
));

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todosArr, setTodosArr] = useState(preparedTodos);

  const [selectNameId, setSelectNameId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorInput, setErrorInput] = useState('');
  const [errorSelect, setErrorSelect] = useState('');

  const rewrite = (newTodo: TodoType) => {
    setTodosArr(currentTodo => [newTodo, ...currentTodo]);

    setQuery('');
    setSelectNameId(0);
    setCompleted(false);
  };

  const submitEvent = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const newTodo = {
      userId: Date.now(),
      id: Date.now(),
      title: query,
      completed,
      user: users.find(user => user.id === selectNameId) || null,
    };

    if (query && selectNameId) {
      rewrite(newTodo);
    }

    if (!query) {
      setErrorInput('Please enter the title');
    }

    if (!selectNameId) {
      setErrorSelect('Please choose a user');
    }
  };

  return (
    <div className="App">
      <h1 className="title is-1 is-spaced mainTitle">Static list of todos</h1>
      <form
        onSubmit={submitEvent}
      >

        <div>
          <p className="error">{errorInput}</p>

          <input
            className={classnames('input', 'is-rounded', 'is-normal', {
              'is-danger': errorInput,
            })}
            type="text"
            placeholder="Please, write title here"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setErrorInput('');
            }}
          />

        </div>

        <div>
          <p className="error">{errorSelect}</p>

          <select
            className="select is-success is-rounded"
            value={selectNameId}
            onChange={(event) => {
              setSelectNameId(+event.target.value);
              setErrorSelect('');
            }}
          >

            <option value="0" disabled>Choose a user</option>

            {users.map(user => (
              <option
                key={`${user.id}`}
                value={`${user.id}`}
              >
                {user.name}
              </option>
            ))}

          </select>

        </div>

        <div>
          <input
            className="checkbox"
            type="checkbox"
            checked={completed}
            onChange={() => (
              setCompleted(true)
            )}
          />

          <label>Completed</label>

        </div>

        <button
          className="button"
          type="submit"
        >
          App
        </button>

      </form>

      <TodoList preparedTodos={todosArr} />
    </div>
  );
};

export default App;
