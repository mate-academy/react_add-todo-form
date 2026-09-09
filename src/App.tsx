import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoList } from './components/TodoList';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todosList, setTodosList] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = selectedUser === 0;

    setHasTitleError(isTitleInvalid);
    setHasUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todosList.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId: selectedUser,
      completed: false,
      user: getUserById(selectedUser),
    };

    setTodosList(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title-input">
            Title:
          </label>{' '}
          <input
            type="text"
            id="title-input"
            data-cy="titleInput"
            value={title}
            onChange={changeEvent => {
              const rawValue = changeEvent.target.value;
              const sanitizedValue = rawValue.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
                '',
              );

              setTitle(sanitizedValue);
              setHasTitleError(false);
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User:
          </label>{' '}
          <select
            data-cy="userSelect"
            id="user-select"
            value={selectedUser}
            onChange={changeEvent => {
              setSelectedUser(+changeEvent.target.value);
              setHasUserError(false);
            }}
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
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
