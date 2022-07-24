import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './components/TodoInfo/TodoInfo';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(
    user => user.id === todo.userId,
  ),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!todoTitle.length);
    setUserError(!userId);

    if (todoTitle.length && userId) {
      const newTodo: Todo = {
        userId,
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: todoTitle,
        completed: false,
        user: usersFromServer.find(
          user => user.id === userId,
        ),
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/users" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter todo title"
            data-cy="titleInput"
            value={todoTitle}
            onChange={(event) => {
              setTitleError(false);
              setTodoTitle(event.target.value);
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserError(false);
              setUserId(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserError && (
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
