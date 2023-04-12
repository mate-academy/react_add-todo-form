import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);
    const formattedTitle = title.trim();

    if (!title || !userId || !formattedTitle) {
      return;
    }

    const addedTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: formattedTitle,
      userId,
      completed: false,
      user: getUser(userId),
    };

    todos.push(addedTodo);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title"
              value={title}
              onChange={handleTitle}
            />

            {titleError
              && (<span className="error">Please enter a title</span>)}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {userError && (<span className="error">Please choose a user</span>)}
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
