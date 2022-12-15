import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [selectedUser, setSelectedUser] = useState('0');
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  const handleChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'titleInput') {
      setTitle(value);
      setIsTitleError(false);
    }

    if (name === 'userSelect') {
      setSelectedUser(value);
      setIsSelectError(false);
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = Math.max(...newTodos.map(todo => todo.id));
    const addNewTodo = () => {
      if (!(title && (selectedUser !== '0'))) {
        setIsSelectError(true);
        setIsTitleError(true);

        return;
      }

      setNewTodos([
        ...newTodos,
        {
          id: newId + 1,
          title,
          completed: false,
          userId: +selectedUser,
          user: getUser(+selectedUser),
        },
      ]);

      setTitle('');
      setSelectedUser('0');
      setIsSelectError(false);
      setIsTitleError(false);
    };

    addNewTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="titleInput"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChanges}
            />
            {(!title && isTitleError) && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              data-cy="userSelect"
              id="userSelect"
              name="userSelect"
              value={selectedUser}
              onChange={handleChanges}
            >
              <option value="0" key={0} disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {(selectedUser === '0' && isSelectError) && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={newTodos} />
      </section>
    </div>
  );
};
