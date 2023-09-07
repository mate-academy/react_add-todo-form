import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo, Todo } from './interfaces/Todo';
import { User } from './interfaces/User';
import { TodoList } from './components/TodoList';

const todoWithUser: PreparedTodo[] = todosFromServer
  .map((todo: Todo) => {
    return {
      ...todo,
      user: usersFromServer
        .find((user: User) => user.id === todo.userId) || null,
    };
  });

export const App = () => {
  const [
    visibleTodos,
    setVisibleTodos,
  ] = useState<PreparedTodo[]>(todoWithUser);

  const [writedTitle, setWritedTitle] = useState('');
  const [hasTitle, setHasTitle] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  const handleOnChangeTitle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setWritedTitle(event.target.value);
    setHasTitle(false);
  });

  const resetForm = () => {
    setWritedTitle('');
    setSelectedUserId(0);
  };

  const handleOnChangeUser = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUser(false);
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitle(!writedTitle);
    setHasSelectedUser(!selectedUserId);

    if (!writedTitle || !selectedUserId) {
      return;
    }

    setVisibleTodos((prevTodos) => {
      const maxId: number = Math.max(...prevTodos.map(todo => todo.id));

      return [
        ...prevTodos,
        {
          id: maxId + 1,
          title: writedTitle,
          completed: false,
          userId: selectedUserId,
          user: usersFromServer.find(user => user.id === selectedUserId)
            || null,
        },
      ];
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={writedTitle}
            onChange={handleOnChangeTitle}
          />
          {hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleOnChangeUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasSelectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
