import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo, TodoId } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [titleValue, setTitleValue] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  function addNewTodo(newTodo: Todo) {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function getNewTodoId(): TodoId {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  function handleOnChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitleValue(event.target.value);

    setHasTitleError(false);
  }

  function handleOnChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(+event.target.value);
    setHasSelectError(false);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!titleValue);
    setHasSelectError(!selectedUser);

    if (!titleValue || !selectedUser) {
      return;
    }

    addNewTodo({
      id: getNewTodoId(),
      title: titleValue,
      completed: false,
      userId: selectedUser,
    });

    setTitleValue('');
    setSelectedUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={titleValue}
              placeholder="Enter a title"
              onChange={handleOnChangeTitle}
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
              onChange={handleOnChangeSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            {hasSelectError && (
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
