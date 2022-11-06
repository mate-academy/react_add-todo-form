import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { FullTodoInfo, User } from './types/Type';

const findUser = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUsers: FullTodoInfo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUser(todo.userId),
}));

const getTodoId = (todos: FullTodoInfo[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<FullTodoInfo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [userID, setUserID] = useState(0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    setUserError(false);
  };

  const hadleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedUser = findUser(userID);

    const titleTrim = title.trim();

    setTitleError(!titleTrim);
    setUserError(!userID);

    if (!titleTrim || !userID) {
      return;
    }

    const newTodo: FullTodoInfo = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId: userID,
      user: selectedUser,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
    setTitle('');
    setUserID(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hadleFormSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInput}
            placeholder="Enter a title"
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={userID}
            onChange={handleSelect}
            required
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

          {userError && (
            <span className="error">Please choose a user</span>
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
