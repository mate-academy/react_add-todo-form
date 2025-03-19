import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export type Todo = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App: React.FC = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [newList, setNewList] = useState(todos);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setNewList(current => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            {`Title: `}
          </label>

          <input
            id="post-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-select">
            {`User: `}
          </label>
          <select
            id="post-select"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(users => {
              return (
                <option value={users.id} key={users.id}>
                  {users.name}
                </option>
              );
            })}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newList} />
    </div>
  );
};
