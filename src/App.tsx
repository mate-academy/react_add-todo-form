import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getTodoId(todos: Todo[]) {
  const ids = todos.map(todo => Number(todo.id));

  return Math.max(...ids) + 1;
}

function getVisibleTodos(todos: typeof todosFromServer) {
  return todos.map(todo => {
    return {
      ...todo,
      user: getUserById(todo.userId),
    };
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getVisibleTodos(todosFromServer));
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(true);
    setUserError(true);

    const currentUserId = +selectedUserId;

    if (title !== '' && selectedUserId !== '0') {
      setTodos([
        ...todos,
        {
          id: getTodoId(todos),
          title: title,
          userId: currentUserId,
          completed: false,
          user: getUserById(currentUserId),
        },
      ]);
      setTitle('');
      setSelectedUserId('0');
      setTitleError(false);
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {titleError && title === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectedUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userError && selectedUserId === '0' && (
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
