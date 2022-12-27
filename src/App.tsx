import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(id: number, users: User[]) {
  return users.find(user => id === user.id) || null;
}

const todoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

function getUserByName(name: string, users: User[]) {
  return users.find(user => name === user.name) || null;
}

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const App: React.FC = () => {
  const titleDefaultValue = '';
  const userDefaultValue = 'Choose a user';

  const [title, setTitle] = useState(titleDefaultValue);
  const [user, setUser] = useState(userDefaultValue);
  const [todos, setTodos] = useState(todoList);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitleEntered, setIsTitleEntered] = useState(true);

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (user !== userDefaultValue && title !== titleDefaultValue) {
      const newUser = getUserByName(user, usersFromServer);
      const newTodoId = getLargestTodoId(todos) + 1;
      const newTodo: Todo = {
        id: newTodoId,
        title,
        completed: false,
        userId: newUser ? newUser.id : null,
        user: newUser,
      };

      setTodos(currentTodo => [...currentTodo, newTodo]);
      setTitle(titleDefaultValue);
      setUser(userDefaultValue);
    }

    if (user === userDefaultValue) {
      setIsUserSelected(false);
    }

    if (title === titleDefaultValue) {
      setIsTitleEntered(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleEntered(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.currentTarget.value);
    setIsUserSelected(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
          </label>

          <input
            type="text"
            id="titleInput"
            name="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
          </label>

          <select
            id="userSelect"
            name="userSelect"
            data-cy="userSelect"
            value={user}
            onChange={handleUserChange}
          >
            <option value={userDefaultValue} disabled>
              {userDefaultValue}
            </option>
            {usersFromServer.map(userInfo => (
              <option value={userInfo.name} key={userInfo.id}>
                {userInfo.name}
              </option>
            ))}
          </select>

          {!isUserSelected && (
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
