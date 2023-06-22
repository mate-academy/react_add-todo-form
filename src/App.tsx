import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { findUserById, getNewId } from './helpers';

import { InitialTodo, Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const users = usersFromServer;
  const [todos, setTodos] = useState<InitialTodo[]>(todosFromServer);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserSelectError, setIsUserSelectError] = useState(false);

  const todosWithUsers: Todo[] = todos.map(todo => ({
    ...todo,
    user: findUserById(users, todo.userId),
  }));

  const clearForm = () => {
    setSelectedUserId(0);
    setNewTodoTitle('');
    setIsTitleError(false);
    setIsUserSelectError(false);
  };

  const handleSetTitle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setIsTitleError(false);
  });

  const handleSelect = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserSelectError(false);
    setSelectedUserId(+event.target.value);
  });

  const handleSubmit = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validatedNewTitle = newTodoTitle.trim();

    if (!selectedUserId || !validatedNewTitle) {
      setIsTitleError(!validatedNewTitle);
      setIsUserSelectError(!selectedUserId);

      return;
    }

    setTodos((prevTodos) => {
      const newTodo = {
        id: getNewId(prevTodos),
        title: validatedNewTitle,
        userId: selectedUserId,
        completed: false,
      };

      return [...prevTodos, newTodo];
    });

    clearForm();
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleTodo">
            {'Title: '}
          </label>

          <input
            id="titleTodo"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={handleSetTitle}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelector">
            {'User: '}
          </label>
          <select
            id="userSelector"
            data-cy="userSelect"
            onChange={handleSelect}
            value={selectedUserId}
          >
            <option value="0">
              Choose a user
            </option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {`${user.name}`}
              </option>
            ))}
          </select>

          {isUserSelectError && (
            <span className="error">
              Please choose a user
            </span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
