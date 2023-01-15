import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const todosWithUsers: TodoWithUser[] = todos
    .map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }));

  const maxId: number = todosWithUsers.reduce((max, currentUser) => {
    return max >= currentUser.id
      ? max
      : currentUser.id;
  }, 0);

  const newTodo: Todo = {
    id: maxId + 1,
    title,
    completed: false,
    userId,
  };
  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId && title.trim()) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      clearForm();
      setHasTitleError(false);
      setHasUserIdError(false);
    }

    setHasTitleError(title.trim() === '');
    setHasUserIdError(userId === 0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={changeTitle}
            placeholder="Enter a title"
          />
          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="username">
            {'User: '}
          </label>

          <select
            id="username"
            data-cy="userSelect"
            value={userId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>

          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
