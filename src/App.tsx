import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (id: number): User | null => {
  const foundedUser = usersFromServer.find(user => user.id === id);

  return foundedUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (visibleTodos: Todo[]) => {
  const todosId = [...visibleTodos].map(el => el.id);

  return Math.max(...todosId);
};

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserSelected(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimedTitle = title.trim();

    if (!selectedUser) {
      setIsUserSelected(true);
    }

    if (!trimedTitle) {
      setIsTitleEmpty(true);
    }

    if (trimedTitle && selectedUser) {
      const newTodoId = getNewTodoId(visibleTodos);
      const user = getUserById(selectedUser);

      setVisibleTodos((prevVisibleTodos) => {
        const newTodo = {
          id: newTodoId + 1,
          title,
          userId: selectedUser,
          completed: false,
          user,
        };

        return [...prevVisibleTodos, newTodo];
      });

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
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              name="title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              name="user"
              value={selectedUser}
              onChange={handleUser}
            >

              <option value={0} disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserSelected
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
