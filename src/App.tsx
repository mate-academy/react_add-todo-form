import React, { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';

const getUserById = (userId: number) => {
  const user = usersFromServer.find(person => person.id === userId);

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  return user;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userSelect, setUserSelect] = useState('');
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim().length > 0;
    const hasUser = userSelect !== '';

    setTitleError(!hasTitle);
    setUserError(!hasUser);

    if (!hasTitle || !hasUser) {
      return;
    }

    const userId = +userSelect;
    const user = getUserById(userId);
    const newTodo: Todo = {
      id: (todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserSelect('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
