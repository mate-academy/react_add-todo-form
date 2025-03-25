import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [changeTitleInputError, setChangeTitleInputError] = useState(false);
  const [changeSelectError, setChangeSelectError] = useState(false);

  const titleChangeEvent = (
    titleInputChangeEvent: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setChangeTitleInputError(false);
    setTitle(titleInputChangeEvent.target.value);
  };

  const selectChangeEvent = (
    userSelectChangeEvent: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setChangeSelectError(false);
    setUserId(+userSelectChangeEvent.target.value);
  };

  const submitEvent = (
    formSubmitEvent: React.FormEvent<HTMLFormElement>,
  ): void => {
    formSubmitEvent.preventDefault();

    setChangeTitleInputError(!title);
    setChangeSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim().replace(/[^A-Za-z0-9\u0400-\u04FF\s]+/gi, ''),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={submitEvent}>
        <div className="field">
          <label htmlFor="titleId">Title:</label>
          <input
            value={title}
            id="titleId"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            onChange={titleChangeEvent}
          />
          {changeTitleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUserId">User:</label>
          <select
            id="selectUserId"
            data-cy="userSelect"
            value={userId}
            onChange={selectChangeEvent}
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

          {changeSelectError && (
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
