import React, { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => (user.id === userId)) || null
);

const getUserByName = (userName: string): User | null => (
  usersFromServer.find(user => (user.name === userName)) || null
);

const getTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodos);
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleValid(true);
    }

    if (!userSelect) {
      setIsUserValid(true);
    }

    if (!userSelect || !title) {
      return;
    }

    setTodos((currentTodos) => {
      const maxTodoId = Math.max(...currentTodos.map(todo => todo.id));
      const newTodo = getUserByName(userSelect);

      return [
        ...currentTodos,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: newTodo ? newTodo.id : null,
          user: newTodo,
        },
      ];
    });

    setTitle('');
    setUserSelect('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserSelect(value);
    setIsUserValid(false);
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
            {'Title: '}
            <input
              data-cy="titleInput"
              type="text"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={handleUserChange}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {isUserValid && (
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
