import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todosLegacy, setTodosLegacy] = useState<Todo[]>(todos);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const findLargestId = () => {
    return Math.max(...(todosLegacy.map(todo => todo.id)));
  };

  const resetForm = () => {
    setNewTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTitle);
    setHasUserError(!selectedUserId);
  };

  const newTodo: Todo = {
    id: findLargestId() + 1,
    title: newTitle,
    completed: false,
    userId: selectedUserId,
    user: usersFromServer.find(user => user.id === selectedUserId),
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
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
          {!newTitle && hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
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

          {!selectedUserId && hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (newTodo.title && selectedUserId) {
              setTodosLegacy((currTodos) => [...currTodos, newTodo]);
              resetForm();
            }
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todosLegacy} />
    </div>
  );
};
