import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';
import { useState } from 'react';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!title) {
      setIsTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setIsUserError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const user = usersFromServer.find(u => userId === u.id) || null;
    const todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      userId,
      title,
      completed: false,
      user,
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleError(false);
    setTitle(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserError(false);
    setUserId(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleUserChange}
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

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
