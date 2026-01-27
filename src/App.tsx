import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user:
        usersFromServer.find(user => user.id === todo.userId) ||
        usersFromServer[0],
    })),
  );
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = !selectedUserId;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title for the todo"
            value={title}
            onChange={e => {
              const filteredValue = e.target.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
                '',
              );

              setTitle(filteredValue);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(e.target.value ? Number(e.target.value) : '');
              setUserError(false);
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
