import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo, TodoId } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectedError, setHasSelectedError] = useState(false);

  function addNewTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function getNewTodoId(): TodoId {
    if (todos.length === 0) {
      return 1;
    }

    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  function handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleChangeSelect(event: React.FormEvent<HTMLSelectElement>) {
    setSelectedUser(+event.target.value);
    setHasSelectedError(false);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    addNewTodo({
      id: getNewTodoId(),
      title,
      completed: false,
      userId: selectedUser,
    });

    setTitle('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="">
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleChangeSelect}
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
            {hasSelectedError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
