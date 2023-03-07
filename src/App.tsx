import './App.scss';
import { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

let newTaskId = 0;

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map((todo) => {
  if (todo.id >= newTaskId) {
    newTaskId = todo.id + 1;
  }

  return {
    ...todo,
    user: getUser(todo.id),
  };
});

export const App = () => {
  const [todosList, addTodo] = useState(todos);
  const [choosedUser, changeUser] = useState(0);
  const [inputValue, changeInput] = useState('');
  const [showInputError, toggleInputError] = useState(false);
  const [showUserError, toggleUserError] = useState(false);

  const printError = () => {
    if (!inputValue) {
      toggleInputError(true);
    }

    if (!choosedUser) {
      toggleUserError(true);
    }
  };

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue || !choosedUser) {
      printError();

      return;
    }

    const newTask: Todo = {
      id: newTaskId,
      title: inputValue,
      completed: false,
      userId: choosedUser,
      user: getUser(choosedUser),
    };

    newTaskId += 1;

    addTodo((tasks) => {
      return [
        ...tasks,
        newTask,
      ];
    });

    changeUser(0);
    changeInput('');
  };

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {
      value,
      id,
    } = event.target;

    if (id === 'titleInput') {
      const validatedValue = value.replace(/[^а-яА-ЯіІїЇ'a-zA-Z0-9 ]/g, '');

      changeInput(validatedValue);
      toggleInputError(false);

      return;
    }

    changeUser(+value);
    toggleUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTask}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={inputValue}
            onChange={handleInput}
          />

          {showInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={choosedUser}
            onChange={handleInput}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => {
              const {
                name,
                id,
              } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {showUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
