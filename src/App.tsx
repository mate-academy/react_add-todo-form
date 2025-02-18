import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import React, { useState } from 'react';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(person => person.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return { ...todo, user };
});

function getNewTodoId(items: Todo[]) {
  const maxId = Math.max(...items.map(item => item.id));

  return maxId + 1;
}

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [hasSelectError, setHasSelectError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectedUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+event.target.value);
    setHasSelectError(false);
  };

  const onAdd = (newTodo: Todo) => {
    const currentTodo = {
      ...newTodo,
      id: getNewTodoId(visibleTodos),
    };

    setVisibleTodos(currentTodos => [...currentTodos, currentTodo]);
  };

  const reset = () => {
    setTitle('');
    setSelectedUser(0);

    setHasTitleError(false);
    setHasSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUserChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError && (
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
