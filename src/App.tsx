import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todoList, setTodolist] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, showTitleError] = useState(false);
  const [userError, showUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newUserId = +userId;
    const maxId = Math.max(...todoList.map(el => el.id));

    const newTodo = {
      id: maxId + 1,
      title: title.toString().trim(),
      completed: false,
      userId: newUserId,
      user: getUserById(newUserId),
    };

    if (!title) {
      showTitleError(true);
    }

    if (!userId) {
      showUserError(true);
    }

    if (!title || !userId) {
      return;
    }

    setTodolist([
      ...todoList,
      newTodo,
    ]);

    setUserId('');
    setTitle('');
  };

  const handleInput = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evnt.target.value.replaceAll(/[^(a-z)(a-я)\d\s]/gi, ''));
    showTitleError(false);
  };

  const handleSelect = (evnt: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(evnt.target.value);
    showUserError(false);
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
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
          </label>

          {titleError
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleSelect}
            >
              <option value="0">
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>
                  { name }
                </option>
              ))}
            </select>
          </label>

          {userError
          && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
