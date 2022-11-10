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

const initialtodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, updateTodos] = useState<Todo[]>(initialtodos);
  const [newTodoTitle, setNewTodo] = useState('');
  const [selectedUserId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setselectedUserError] = useState(false);

  const newTodo: Todo = {
    id: getNextTodoId(todos),
    userId: selectedUserId,
    title: newTodoTitle,
    completed: false,
    user: getUser(selectedUserId),
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim().length === 0) {
      setTitleError(true);
    }

    if (selectedUserId === 0) {
      setselectedUserError(true);
    }

    if (newTodoTitle.trim().length !== 0 && selectedUserId !== 0) {
      updateTodos([...todos, newTodo]);
      setNewTodo('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleTodo">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleTodo"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={(event) => {
              setNewTodo(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setselectedUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
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
