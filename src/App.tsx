import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';

function getTodosWithUser(todos: Todo[], users: User[]): TodoWithUser[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
}

export const App: React.FC = () => {
  const preparedTodos = getTodosWithUser(todosFromServer, usersFromServer);

  const [todos, setTodos] = useState<TodoWithUser[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserEmpty = selectedUserId === 0;

    setTitleError(isTitleEmpty);
    setSelectedUserIdError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const user = usersFromServer.find(
      candidate => candidate.id === selectedUserId,
    );

    if (!user) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: TodoWithUser = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: user.id,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setSelectedUserIdError(false);
            }}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError && (
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
