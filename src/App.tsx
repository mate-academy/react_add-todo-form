import './App.scss';
import { useState } from 'react';

import { Todo, User } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const users = usersFromServer;

  const initialTodos = todosFromServer
    .map(todo => {
      const user = users.find(currentUser => currentUser.id === todo.userId);

      return user ? { ...todo, user } : null;
    })
    .filter((todo): todo is Todo => todo !== null);
  const [todosState, setTodosState] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedUser: User | undefined = users.find(user => {
      return user.id === Number(userId);
    });

    setTitleError(!title.trim());
    setUserIdError(!userId || !selectedUser);

    if (!title.trim() || !userId || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todosState.map(todo => todo.id)) + 1,
      title: title.trim(),
      completed: false,
      userId: Number(userId),
      user: selectedUser,
    };

    setTodosState([...todosState, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosState} />
    </div>
  );
};
