import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
// import { User } from './types/User';
import { Todo } from './types/Todo';
// import users from './api/users';

function findUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByName(userName: string) {
  return usersFromServer.find(user => user.name === userName) || null;
}

const preparedTodoList: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todoList, setTodoList] = useState(preparedTodoList);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setErrorOnUserSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitleInput(!title.trim());
    setErrorOnUserSelect(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = findUserByName(selectedUser);

    setTodoList(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          title,
          user: userToAdd,
          userId: userToAdd ? userToAdd.id : null,
          id: maxTodoId + 1,
          completed: false,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label
            htmlFor="title"
          >
            Enter a task:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Task"
            value={title}
            onChange={handleTitleChange}
          />
          {isErrorOnTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
          >
            Choose a user:
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {isErrorOnUserSelect && (
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
