import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

export const getNewTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [newTodos, setNewTodos] = useState<Todo[]>(getNewTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleResetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    const newTodoId = Math.max(...newTodos.map((todo) => todo.id)) + 1;

    const newTodo: Todo = {
      id: newTodoId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    if (userId && title) {
      setNewTodos(currentTodos => [...currentTodos, newTodo]);
      handleResetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            {'Title: ' }
            <input
              type="text"
              data-cy="titleInput"
              className="forms"
              placeholder="title"
              value={title}
              onChange={handleInput}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'Your User: ' }
            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={handleSelect}
              className="forms"
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
