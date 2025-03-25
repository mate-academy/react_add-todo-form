import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';

const findUserById = (userId: number) => {
  return usersFromServer.find(u => u.id === userId);
};

export const App = () => {
  const todos = todosFromServer.map(todo => {
    const user = findUserById(todo.userId);

    return { ...todo, user };
  });

  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [chosenUser, setChosenUser] = useState(0);
  const [error, setError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenUser(+event.target.value);
  };

  const addTodo = () => {
    const getId =
      visibleTodos.reduce((acc, todo) => {
        if (todo.id > acc) {
          return todo.id;
        }

        return acc;
      }, 0) + 1;

    const newTodo = {
      id: getId,
      title: title,
      completed: false,
      userId: chosenUser,
      user: findUserById(chosenUser),
    };

    setVisibleTodos(currTodos => {
      return [...currTodos, newTodo];
    });
  };

  const reset = () => {
    setTitle('');
    setChosenUser(0);
    setError(false);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !chosenUser) {
      setError(true);

      return;
    }

    addTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => onSubmitHandler(event)}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {!title && error && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
            <select
              value={chosenUser}
              id="user"
              data-cy="userSelect"
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!chosenUser && error && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
