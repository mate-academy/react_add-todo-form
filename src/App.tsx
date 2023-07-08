import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

const findUserById = (id: number) => {
  return usersFromServer.find(user => (
    user.id === id
  )) || null;
};

const parsedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const findMaxTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

export const App = () => {
  // #region state
  const [todos, setTodos] = useState<Todo[]>(parsedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);
  // #endregion
  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setTodos(prevTodos => {
      const newTodo = {
        id: findMaxTodoId(prevTodos) + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: findUserById(selectedUserId),
      };

      return [
        ...prevTodos,
        newTodo,
      ];
    });

    setTitle('');
    setSelectedUserId(0);
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Please enter a title"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserError && (
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
