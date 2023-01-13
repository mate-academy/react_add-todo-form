// import React, { useState } from 'react';
import './App.scss';
import { useEffect, useState } from 'react';
import { Todo } from './Types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

// export const todos: Todo[] = todosFromServer.map(todo => ({
//   ...todo,
//   user: getUser(todo.userId),
// }));

export const App: React.FC = () => {
  const visibleUsers = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTodos(todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })));
  }, []);

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prev) => {
      const todo = {
        title,
        userId: +(selectedUser),
        completed,
        user: getUser(Number(selectedUser)),
        id: Math.max(...prev.map(item => item.id)) + 1,
      };

      return (
        [
          ...prev,
          todo,
        ]
      );
    });

    setTitle('');
    setCompleted(false);
    setSelectedUser('0');
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
          <span className="error">Title:</span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="field">
          <span className="error">Completed:</span>
          <input
            type="checkbox"
            data-cy="completed"
            checked={completed}
            onChange={() => {
              setCompleted((prev) => !prev);
            }}
          />
        </div>

        <div className="field">
          <span className="error">User:</span>
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {visibleUsers.map((person) => (
              <option value={person.id}>
                {person.name}
              </option>
            ))}
          </select>

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
