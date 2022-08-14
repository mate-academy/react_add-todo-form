import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getNextTodoId(todosArray: Todo[]): number {
  return Math.max(...todosArray.map(todo => todo.id)) + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, updateTodos] = useState<Todo[]>(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const newTodo: Todo = {
    id: getNextTodoId(todos),
    userId: selectedUserId,
    title: newTodoTitle,
    completed: false,
    user: getUser(selectedUserId),
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodoTitle) {
      setTitleError(true);
    }

    if (selectedUserId === 0) {
      setSelectedUserError(true);
    }

    if (newTodoTitle && selectedUserId !== 0) {
      updateTodos([...todos, newTodo]);
      setNewTodoTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleTodo">Title:</label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleTodo"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={(event) => {
              setNewTodoTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(Number(event.target.value));
              setSelectedUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {selectedUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
