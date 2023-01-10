import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => (user.name === userName)) || null;
}

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const prepTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(prepTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = getUserByName(selectedUser);

    setTodos(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxTodoId + 1,
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
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title"> Write down your task:</label>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title of task"
            value={title}
            onChange={handleTitleChange}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="title">Choose a user:</label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          <span
            className="error"
          >
            Please choose a user
          </span>
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
