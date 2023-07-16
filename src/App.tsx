import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const todosWithUsers: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer.find((user: User) => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState({
    userId: false,
    title: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsError((currentIsError) => ({
      ...currentIsError,
      userId: selectedUserId === '',
      title: title.trim() === '',
    }));

    if (selectedUserId && title.trim()) {
      const newTodo: Todo = {
        id: Math.max(...todosWithUsers.map((todo) => todo.id)) + 1,
        userId: Number(selectedUserId),
        title,
        completed: false,
        user: usersFromServer.find(
          (user: User) => user.id === Number(selectedUserId),
        ),
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      setTitle('');
      setSelectedUserId('');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
      setIsError((currentIsError) => ({
        ...currentIsError,
        title: false,
      }));
    } else {
      setSelectedUserId(event.target.value);
      setIsError((currentIsError) => ({
        ...currentIsError,
        userId: false,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />

          {isError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            name="user id"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isError.userId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
