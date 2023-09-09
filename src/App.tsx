import './App.scss';
import { FormEventHandler, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewTodoId, getUserById } from './utils';

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>(preparedTodos);

  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const addTodo = (newTodo: Todo) => {
    const newId = getNewTodoId(todosList);

    setTodosList(currentTodos => [
      ...currentTodos,
      {
        ...newTodo,
        id: newId,
      },
    ]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdError(false);
    setUserId(+event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle || !userId) {
      setTitleError(!newTitle);
      setUserIdError(!userId);

      return;
    }

    addTodo({
      user: getUserById(userId),
      id: 0,
      title,
      completed: false,
      userId,
    });

    reset();
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            id="select"
            value={userId}
            onChange={handleUserIdChange}
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

          {userIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={titleError || userIdError}
        >
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
