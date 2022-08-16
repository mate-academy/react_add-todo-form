import React, { ChangeEvent, useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/Users';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const currentUser = usersFromServer.find(user => user.id === userId);

  return currentUser || null;
}

function getTodo():Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

function getNewTodoId(todosArray: Todo[]): number {
  return Math.max(...todosArray.map(todo => todo.id)) + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodo());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (title && userId) {
      addNewTodo();
      clearForm();
    }
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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter title"
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUser}
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

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
