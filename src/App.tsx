import React, { useState } from 'react';
import './App.scss';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getMaxTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id));
}

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>(todosWithUser);
  const [newTodoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: getMaxTodoId(todo) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodo((previoutTodo) => [...previoutTodo, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTodoTitle);
    setHasUserError(!selectedUser);

    if (newTodoTitle && selectedUser) {
      addNewTodo(newTodoTitle, selectedUser);

      setTodoTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              value={newTodoTitle}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={event => {
                setTodoTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
            {hasTitleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => {
                setSelectedUser(+event.target.value);
                setHasUserError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasUserError && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todo} />
    </div>
  );
};
