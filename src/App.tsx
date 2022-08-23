import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const getNewTodoId = (todos: Todo[]): number => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle && selectedUserId) {
      const newTodo: Todo = {
        id: getNewTodoId(todos),
        userId: selectedUserId,
        title: newTodoTitle,
        completed: false,
        user: getUser(selectedUserId),
      };

      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
      setSelectedUserId(0);
    } else {
      if (!newTodoTitle) {
        setTitleError(true);
      }

      if (!selectedUserId) {
        setSelectedUserError(true);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleTodo">Title: </label>
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
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setSelectedUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
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
