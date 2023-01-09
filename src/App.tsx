import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { getTheLargestId } from './additionalFunction/getTheLargestId';
import { getUser } from './additionalFunction/getUser';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUser(usersFromServer, todo.userId),
    })),
  );
  const [userForTodo, setUser] = useState(0);
  const [titleForTodo, setTitele] = useState('');
  const [incorrectTitle, setTitleValidation] = useState(false);
  const [incorrectUser, setUserValidation] = useState(false);

  const isDataCorrect = () => {
    const isTitleCorrect = titleForTodo !== '';
    const isUserCorrect = userForTodo !== 0;

    if (!isTitleCorrect) {
      setTitleValidation(true);
    } else {
      setTitleValidation(false);
    }

    if (!isUserCorrect) {
      setUserValidation(true);
    } else {
      setUserValidation(false);
    }

    return isTitleCorrect && isUserCorrect;
  };

  const addTodo = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    if (isDataCorrect()) {
      const newTodo: Todo = {
        id: getTheLargestId(todos) + 1,
        title: titleForTodo,
        completed: false,
        userId: userForTodo,
        user: getUser(usersFromServer, userForTodo),
      };

      setTodos(currentList => [...currentList, newTodo]);
      setUser(0);
      setTitele('');
    }
  };

  return (
    <div
      className="
        App
        is-flex
        is-flex-direction-column
        is-align-items-center
      "
    >
      <h1 className="title">Add todo form</h1>

      <form
        onSubmit={addTodo}
        action="/api/users"
        method="POST"
        className="form"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleForTodo}
            onChange={(event) => {
              setTitele(event.currentTarget.value);
              setTitleValidation(false);
            }}
            className="input is-medium"
          />
          {
            incorrectTitle
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userForTodo}
            onChange={(event) => {
              setUser(+event.currentTarget.value);
              setUserValidation(false);
            }}
            className="select is-medium"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(person => (
              <option
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>

          {
            incorrectUser
            && (<span className="error">Please choose a user</span>)
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-success"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
