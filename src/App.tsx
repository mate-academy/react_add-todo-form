import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number | null) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isUserSelectError, setIsUserSelectError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const clearForm = () => {
    setSelectedUserId(0);
    setNewTodoTitle('');
    setIsTitleError(false);
    setIsUserSelectError(false);
  };

  const getNewId = (arr: { id: number }[]): number => {
    const ids = arr.map((item) => item.id);
    const max = Math.max(...ids);

    return Number.isFinite(max)
      ? max + 1
      : 1;
  };

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setIsUserSelectError(false);
  };

  const handleSubmit = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateNewTitle = newTodoTitle.trim();

    if (!selectedUserId || !validateNewTitle) {
      setIsTitleError(!validateNewTitle);
      setIsUserSelectError(!selectedUserId);

      return;
    }

    setTodos((prevTodos) => {
      const newTodo: Todo = {
        id: getNewId(prevTodos),
        title: validateNewTitle,
        userId: selectedUserId,
        completed: false,
        user: getUser(selectedUserId),
      };

      return [...prevTodos, newTodo];
    });

    clearForm();
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="taskTitle">
            {'Title: '}
          </label>

          <input
            type="text"
            id="taskTitle"
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
          <label htmlFor="select">
            {'User: '}
          </label>

          <select
            data-cy="userSelect"
            id="select"
            value={selectedUserId}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserSelectError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
