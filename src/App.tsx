import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { Element } from './types/Element';
import { TodoList } from './components/TodoList';

function getUserById(id: number): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleChange = (event: React.ChangeEvent<Element>) => {
    const { id, value } = event.target;

    switch (id) {
      case 'titleInputForm':
        setIsTitleError(false);
        setTodoTitle(value);
        break;

      case 'userSelectForm':
        setIsUserError(false);
        setSelectedUser(getUserById(+(value)));
        break;

      default:
        throw new Error('Unknown form type');
    }
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsUserError(true);
    }

    if (!trimmedTitle || !selectedUser) {
      return;
    }

    const newTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newTodoId,
      userId: selectedUser.id,
      title: todoTitle,
      completed: false,
      user: selectedUser,
    };

    setTodos([...visibleTodos, newTodo]);
    setSelectedUser(null);
    setTodoTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="titleInputForm">
            Title:
          </label>

          <input
            id="titleInputForm"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleChange}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelectForm">
            User:
          </label>

          <select
            id="userSelectForm"
            data-cy="userSelect"
            value={selectedUser?.id || 0}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
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
