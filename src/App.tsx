import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import './App.scss';
import 'bulma/css/bulma.min.css';

const getUserById = (userId: number) => {
  return usersFromServer.find(({ id }) => id === userId) || null;
};

const initialTodos = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

const isAppropriateChar = (ch: string) => {
  const regex = new RegExp('^[a-z0-9]+$');

  return regex.test(ch);
};

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { length } = value;

    if (length === 0 || isAppropriateChar(value[length - 1])) {
      setTodoTitle(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle && selectedUserId) {
      const currentMaxId = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: currentMaxId + 1,
        title: todoTitle,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      const newTodos = [...todos, newTodo];

      setTodos(newTodos);
      setSelectedUserId(0);
      setTodoTitle('');
      setShouldShowError(false);
    } else {
      setShouldShowError(true);
    }
  };

  return (
    <div className="App">
      <h1 className="title is-2">
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="form__field">
          <input
            type="text"
            className="input is-medium"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />

          {
            shouldShowError
            && !todoTitle
            && (
              <span className="error">
                Please enter a title
              </span>
            )
          }
        </div>

        <div className="form__field form__field--last">
          <div className="select is-medium">
            <select
              className="user-select"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(Number(event.target.value));
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {
            shouldShowError
            && !selectedUserId
            && (
              <span className="error">
                Please choose a user
              </span>
            )
          }
        </div>

        <button
          type="submit"
          className="button is-info is-medium"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
