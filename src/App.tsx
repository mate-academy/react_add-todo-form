import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo, Todo } from './interfaces/Todo';
import { User } from './interfaces/User';
import { TodoList } from './components/TodoList';

const findUser = (users: User[], todoUserId: number): User | null => {
  return users.find((user: User) => user.id === todoUserId) || null;
};

const userJoinToTodos = (todos: Todo[]): PreparedTodo[] => {
  return todos
    .map((todo: Todo) => ({
      ...todo,
      user: findUser(usersFromServer, todo.userId),
    }));
};

const preparedTodos: PreparedTodo[] = userJoinToTodos(todosFromServer);

export const App = () => {
  const [
    visibleTodos,
    setVisibleTodos,
  ] = useState<PreparedTodo[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [hasTitle, setHasTitle] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  const handleTitleChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitle(false);
  });

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleUserChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUser(false);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitle(!title);
    setHasSelectedUser(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setVisibleTodos((prevTodos) => {
      const maxId: number = Math.max(...prevTodos.map(todo => todo.id));

      return [
        ...prevTodos,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: selectedUserId,
          user: findUser(usersFromServer, selectedUserId),
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
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
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
