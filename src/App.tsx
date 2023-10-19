import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(id: number): User | undefined {
  return usersFromServer.find((user) => user.id === id);
}

const preparedTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getID = () => {
  const maxId = Math.max(...preparedTodos.map((todo) => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [authorId, setAuthorId] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const author = getUserById(authorId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (!author) {
      setIsUserError(true);
    }

    if (title && author) {
      setTodos(currentTodos => [
        ...currentTodos,
        {
          id: getID(),
          title,
          userId: author.id,
          user: author,
          completed: false,
        },
      ]);

      setTitle('');
      setAuthorId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleError(false);
    setTitle(event.target.value.trimStart());
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserError(false);
    setAuthorId(+event.target.value);
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
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={authorId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
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
