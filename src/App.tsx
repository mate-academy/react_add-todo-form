import './App.scss';
import React, { useState } from 'react';
import { User } from './types/user';
import { Todo } from './types/todo';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { getUserById } from './services/userSer';
import todosFromServer from './api/todos';

function getNewTodoId(todos: Todo[]): number {
  if (todos.length === 0) {
    const RANDOM_ID = +Math.random().toFixed(8).slice(2);

    return RANDOM_ID;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  // #region state
  const [todoList, setTodoList] = useState<Todo[]>(initialTodoList);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  // #endregion

  const addTodo = (todo: Todo) => {
    setTodoList(currentTodoList => [...currentTodoList, todo]);
  };

  // #region handle
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todoList),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
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
