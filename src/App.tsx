import React, { SyntheticEvent, useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find((customer) => (
    customer.id === todo.userId)) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todosToRender, setTodosToRenter] = useState(preparedTodos);
  const [errorUserId, setErrorUserId] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const checkUserId = (userIdField: number) => {
    if (userIdField === 0) {
      setErrorUserId(true);
    } else {
      setErrorUserId(false);
    }
  };

  const checkTitle = (titleField: string) => {
    if (titleField.trim() === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    const exceptionSymbols = /[^A-Za-z0-9А-ЯЄІЇа-яєії\s]/gi;
    const correctededTitle = titleField.replace(exceptionSymbols, '');

    setTitle(correctededTitle);
  };

  const handleAdd = (event: SyntheticEvent) => {
    event.preventDefault();
    checkUserId(userId);
    checkTitle(title);

    if (title === '') {
      setErrorTitle(true);
    }

    if (title.trim() !== '' && userId !== 0) {
      const customer = users.find((user) => userId === user.id) || null;

      setTodosToRenter([
        {
          userId: customer ? customer.id : 0,
          id: todosToRender[todosToRender.length - 1].id + 1,
          title: title.trim(),
          completed: false,
          user: customer,
        },
        ...todosToRender,
      ]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1 className="App__main-title">
        Add todo form
      </h1>
      <form
        method="post"
        name="selectTodo"
        className="App__form"
        onSubmit={handleAdd}
      >
        <label className="App__label">
          <input
            className="App__input"
            name="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>
        <p className="App__error">
          {errorTitle && ('Please enter the title')}
        </p>
        <select
          className="App__input App__input--select"
          name="name"
          value={userId}
          onChange={(event) => {
            setUserId(Number(event.target.value));
          }}
        >
          <option value="0">
            Choose a user
          </option>
          {
            users.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))
          }
        </select>

        <p className="App__error">
          {errorUserId && ('Please choose a user')}
        </p>

        <button
          className="App__button"
          type="submit"
        >
          Add
        </button>
      </form>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodoList prepTodos={todosToRender} />
    </div>
  );
};

export default App;
