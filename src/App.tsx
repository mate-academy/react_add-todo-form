import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

const findMaxId = (arrOfTodos: Todo[]) => {
  const todosId = arrOfTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedUser, setSelectedUser] = useState(0);
  const [isTitle, setIsTitle] = useState(true);
  const [isUserChose, setIsUserChose] = useState(true);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const handleUserSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserChose(true);
  };

  const hendleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimedTitle = title.trim();

    if (!trimedTitle) {
      setIsTitle(false);
    }

    if (!selectedUser) {
      setIsUserChose(false);
    }

    if (trimedTitle && selectedUser) {
      const newUser = getUserById(selectedUser);
      const newTodoId = findMaxId(visibleTodos);

      const newTodo: Todo = {
        id: newTodoId,
        title,
        userId: selectedUser,
        completed: false,
        user: newUser,
      };

      setVisibleTodos([...visibleTodos, newTodo]);

      setTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hendleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={handleTitle}
          />
          {!isTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserSelect}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!isUserChose && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
