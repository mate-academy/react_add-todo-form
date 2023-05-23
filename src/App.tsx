import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(() => preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setHasUserError(true);
    }

    if (todoTitle && selectedUser) {
      setTodos((prevTodos) => [...prevTodos, {
        id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
        userId: selectedUser,
        title: todoTitle,
        completed: false,
        user: getUserById(selectedUser) || null,
      }]);

      setTodoTitle('');
      setSelectedUser(0);
    }
  };

  const handleTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleSelectedUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    if (hasUserError) {
      setHasUserError(false);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTodoTitle}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUser}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                );
              })
            }
          </select>
          {hasUserError && (
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
