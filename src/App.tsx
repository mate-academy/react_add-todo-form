import { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { getTheLargestId } from './additionalFunction/getTheLargestId';
import { getUser } from './additionalFunction/getUser';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [title, setTitele] = useState('');
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  useEffect(() => {
    const editedTodos = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(usersFromServer, todo.userId),
    }));

    setTodos(editedTodos);
  }, []);

  const isDataCorrect = () => {
    const isTitleCorrect = title !== '';
    const isUserCorrect = userId !== 0;

    setTitleError(!isTitleCorrect);
    setUserError(!isUserCorrect);

    return isTitleCorrect && isUserCorrect;
  };

  const addTodo = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    if (isDataCorrect()) {
      const newTodo: Todo = {
        id: getTheLargestId(todos) + 1,
        title,
        completed: false,
        userId,
        user: getUser(usersFromServer, userId),
      };

      setTodos(currentList => [...currentList, newTodo]);
      setUserId(0);
      setTitele('');
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitele(event.currentTarget.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.currentTarget.value);
    setUserError(false);
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
        className="form"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
            className="input is-medium"
          />
          {
            isTitleError
            && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
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
            isUserError
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
