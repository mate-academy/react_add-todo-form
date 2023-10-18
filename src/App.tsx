import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUserById } from './services/user';
import { getNewId } from './services/todo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserTouched, setIsUserTouched] = useState(false);

  const reset = () => {
    setTitle('');
    setIsTitleTouched(false);
    setUserId(0);
    setIsUserTouched(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || userId === 0) {
      setIsTitleTouched(true);
      setIsUserTouched(true);

      return;
    }

    const newTodo: Todo = {
      id: getNewId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          {isTitleTouched && !title
            ? <span className="error">Please enter a title</span>
            : null}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={event => setUserId(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserTouched && userId === 0
            ? <span className="error">Please choose a user</span>
            : null}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
