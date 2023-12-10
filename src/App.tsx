import './App.scss';
import { useState } from 'react';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const resetFieldsForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleSpaces = /^\s+$/.test(title);

    setTitleError(!title || isTitleSpaces);
    setUserError(!userId);

    if (!title.trim() || !userId || isTitleSpaces) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: maxId,
      title,
      completed: false,
      userId,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);

    resetFieldsForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleOnSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label htmlFor="Title_Form">Title: </label>
          <input
            id="Title_Form"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleHandler}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="Select">User: </label>
          <select
            id="Select"
            data-cy="userSelect"
            value={userId}
            onChange={selectUserHandler}
          >
            <option value={0} disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}

          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
