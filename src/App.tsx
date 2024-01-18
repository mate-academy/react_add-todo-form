/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import { User } from './types/Users';
import { TodoWithUser } from './types/TodoWithUser';

const getPreparedData = (todos: Todo[], users: User[]): TodoWithUser[] => {
  return todos.map(todo => {
    const user = users.find(u => u.id === todo.userId) || null;

    return { ...todo, user };
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(getPreparedData(
    todosFromServer, usersFromServer,
  ));
  const users = usersFromServer;
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitleError, setIsTitleError] = useState(true);

  const maxIndexOfTodo = (): number => Math
    .max(...todos.map(todo => todo.id));

  const makeTodo = (): TodoWithUser => {
    const id = maxIndexOfTodo() + 1;
    const todo = {
      title,
      id,
      userId: selectedUserId,
      completed: false,
      user: usersFromServer.find(u => u.id === selectedUserId) || null,
    };

    return todo;
  };

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedUserId !== 0 && title) {
      setTitle('');
      setSelectedUserId(0);
      setTodos(prevTodos => [...prevTodos, makeTodo()]);
    }

    if (!title) {
      setIsTitleError(false);
    }

    if (selectedUserId === 0) {
      setIsUserSelected(false);
    }
  };

  // eslint-disable-next-line max-len
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onAdd}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />

          {!isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setIsUserSelected(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map((user, idx) => (
              <option value={idx + 1} key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
