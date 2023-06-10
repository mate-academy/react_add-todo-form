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
  const [todoList, updateTodolist] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userSelect, setUser] = useState('');
  const [hasTitle, showTitleError] = useState(false);
  const [hasUser, showUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userId = +userSelect;
    const maxId = Math.max(...todoList.map(el => el.id));

    const newTodo = {
      id: maxId + 1,
      title: title.toString().trim(),
      completed: false,
      userId: 0,
      user: getUserById(userId),
    };

    if (!title) {
      showTitleError(true);
    }

    if (!userSelect) {
      showUserError(true);
    }

    if (!title || !userSelect) {
      return;
    }

    updateTodolist([
      ...todoList,
      newTodo,
    ]);

    setUser('0');
    setTitle('');
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
              onChange={(evnt) => {
                setTitle(evnt.target.value);
                showTitleError(false);
              }}
            />
          </label>

          {hasTitle
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={(evnt) => {
                setUser(evnt.target.value);
                showUserError(false);
              }}
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

          {hasUser
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
