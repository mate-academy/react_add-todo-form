import { useState } from 'react';
import './App.scss';

import { usersFromServer } from './api';
import { TodoList } from './components/TodoList';
import { getUser, todosWithUser, getId } from './utils';
import { Todo } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = (event.target.value).trimStart();

    setTitle(newTitle);
    setTitleError('');
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectesUser = Number(event.target.value);

    setUserId(selectesUser);
    setUserError('');
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: getId(todos),
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const hanfleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    const isValid = title && userId;

    if (!isValid) {
      return;
    }

    addTodo();
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={hanfleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
