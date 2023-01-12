import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

const allTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(allTodos);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsUserSelected(false);
  };

  const handleNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitle(!title.trim());
    setIsUserSelected(!selectedUser);

    if (!selectedUser || title.trim() === '') {
      return;
    }

    const userToAdd = findUserByName(selectedUser);

    setTodos(current => {
      const MaxId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: MaxId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleNewTodo}
      >
        <div className="field">
          <label
            htmlFor="title"
          >
            Title:
          </label>

          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a title"
            className="formElement"
          />

          {isTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="select"
          >
            User:
          </label>

          <select
            data-cy="userSelect"
            name="select"
            value={selectedUser}
            onChange={handleUserSelect}
            className="formElement selector"
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserSelected && (
            <span className="error">
              Please choose a user
            </span>
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
