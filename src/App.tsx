import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

export function getUserId(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNextTodoId(todoList: Todo[]) {
  const maxTodoId = Math.max(...todoList.map(todo => todo.id));

  return maxTodoId + 1;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setUserIdError(userId === 0);
    setHasTitleError(trimmedTitle === '');

    if (userId > 0 && trimmedTitle) {
      const newId = getNextTodoId(todoList);

      setTodoList([
        ...todoList,
        {
          id: newId,
          title: trimmedTitle,
          completed: false,
          userId,
          user: getUserId(userId),
        },
      ]);

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              value={title}
              onChange={handleTitleUpdate}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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
            {userIdError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
