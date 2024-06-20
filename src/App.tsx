import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/Todo';

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

const findMaxId = (todos: TodoWithUser[]) => {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids);
};

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setTitleError(false);

    setSelectedUserId('0');
    setSelectedUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = !!title.trim();
    const isUserValid = selectedUserId !== '0';

    if (!isTitleValid) {
      setTitleError(true);
    }

    if (!isUserValid) {
      setSelectedUserIdError(true);
    }

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: findMaxId(todos) + 1,
      title,
      userId: +selectedUserId,
      completed: false,
      user:
        usersFromServer.find(person => person.id === +selectedUserId) || null,
    };

    setTodos(current => [...current, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title-input"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>
          <select
            data-cy="userSelect"
            id="user-select"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setSelectedUserIdError(false);
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

          {selectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
