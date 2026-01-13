import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(data => data.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const clearError = () => {
    setTitleError(false);
    setUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUser(0);

    clearError();
  };

  function getNewTodoId(todosList: Todo[]): number {
    if (todosList.length === 0) {
      return 1;
    }

    const maxId = Math.max(...todosList.map(todo => todo.id));

    return maxId + 1;
  }

  function formSubmit(event: React.FormEvent) {
    event.preventDefault();
    clearError();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    if (user === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(data => data.id === Number(user));

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: getNewTodoId(todos),
      title: title.trim(),
      userId: +user,
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={formSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              const nextTitle = event.target.value;

              setTitle(nextTitle);

              if (nextTitle.trim() !== '') {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => {
              const nextUser = +event.target.value;

              setUser(nextUser);

              if (nextUser !== 0) {
                setUserError(false);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(data => (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
