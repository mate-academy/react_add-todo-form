import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { createIdForTodo, getToDosWithUsers } from './helpers';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectedUserIdError, setSelectedUserIdError] = useState(false);

  const toDosForRender = getToDosWithUsers(todos, usersFromServer);

  const addTodo = (name:string, userId: number) => {
    setTodos((currentTodos) => {
      const newTodo = {
        id: createIdForTodo(currentTodos),
        title: name,
        completed: false,
        userId,
      };

      return [...currentTodos, newTodo];
    });
  };

  const resetForm = () => {
    setSelectedUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(!title);
    setSelectedUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addTodo(title, selectedUserId);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            placeholder="Your title here"
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setSelectedUserIdError(false);
            }}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>

          {isSelectedUserIdError
          && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={toDosForRender} />
    </div>
  );
};
