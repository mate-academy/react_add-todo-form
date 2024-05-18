import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getTodosId(todoId: Todo[]) {
  const maxTodoId = Math.max(...todoId.map(todo => todo.id));

  return maxTodoId + 1;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const newId = getTodosId(todoList);

  const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
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
    setUserIdError(!userId);

    if (!title.trim()) {
      sethasTitleError(true);
    }

    if (userId > 0 && title.trim() !== '') {
      sethasTitleError(false);
      setUserIdError(false);
    } else {
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    reset();
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
              onSubmit={handleSubmit}
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
      <section className="TodoList">
        <TodoList todos={todoList} />
      </section>
    </div>
  );
};
