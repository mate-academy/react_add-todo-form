import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [isUserError, setUserError] = useState(false);
  const [isTitleEror, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const addedUser = findUserById(selectedUser);

    setTodos(current => {
      const nextTodo = Math.max(...current.map(todo => todo.id)) + 1;

      return [
        ...current,
        {
          id: nextTodo,
          title,
          completed: false,
          userId: addedUser ? addedUser.id : null,
          user: addedUser,
        },
      ];
    });

    setTitle('');
    setSelectedUser(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            className="form__field-input"
            placeholder="Enter a title"
            id="title"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {isTitleEror && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {isUserError && (
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

      <TodoList todos={todos} />
    </div>
  );
};
