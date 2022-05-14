import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodos } from './components/PreparedTodos';

export const preparedTodos: PreparedTodos[] = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [list, setList] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [submit, setSubmit] = useState(true);
  const [isSelectError, setSelectError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);

  const submited = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
      setTitle('');

      return;
    }

    setTitleError(false);

    if (!todo) {
      setSelectError(true);

      return;
    }

    setSelectError(false);

    const stateUser = users.find(user => (
      user.name === todo
    ));

    const newTodo: PreparedTodos = {
      userId: stateUser?.id,
      id: list.length + 1,
      user: stateUser,
      title,
      completed: false,
    };

    setList([
      ...list,
      newTodo,
    ]);

    setTodo('');
    setTitle('');
    setSubmit(false);
  };

  return (
    <div className="app">
      <h1 className="app__title">Static list of todos</h1>
        <TodoList todos={list} />
      <div className="field">
        <form
          method="post"
          onSubmit={submited}
        >
          <label htmlFor="text__input">
            <input
              id='text__input'
              className='App__input'
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                const { value } = event.target;

                setTitle((current) => {
                  if (submit) {
                    if (value.length > 0) {
                      setTitleError(false);
                    } else {
                      setTitleError(true);
                    }
                  }

                  if (value[value.length - 1] === undefined) {
                    return '';
                  }

                  if (!value[value.length - 1].match(/[A-Za-zА-Яа-я0-9 ]/g)) {
                    return current;
                  }

                  return value;
                });
              }}
            />
          </label>

          {isTitleError && (
            <p className="form__error">
              * Please enter the title
            </p>
          )}

          <select
            value={todo}
            onChange={(event) => {
              const { value } = event.target;

              if (submit) {
                if (value.length > 0) {
                  setSelectError(false);
                } else {
                  setSelectError(true);
                }
              }

              setTodo(value);
            }}
          >
            <option value="">Choose a user</option>
            {
              users.map(user => (
                <option
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {isSelectError && (
            <p className="form__error">
              * Please choose a user
            </p>
          )}

          <button type='submit' className='App__button'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
