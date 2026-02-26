import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';
import { Users } from './types/Users';

type TodoWithUser = Todos & {
  user: Users;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasErrorInput, setHasErrorInput] = useState(false);
  const [hasErrorSelect, setHasErrorSelect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    setUserId(value);
    setHasErrorSelect(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    setHasErrorInput(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    const isTitleEmpty = !title;
    const isUserNotSelected = userId === 0;

    setHasErrorInput(isTitleEmpty);
    setHasErrorSelect(isUserNotSelected);

    if (!isTitleEmpty && !isUserNotSelected) {
      const selectedUser = usersFromServer.find(user => user.id === userId);

      if (!selectedUser) {
        return;
      }

      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: Math.max(...prevTodos.map(todo => todo.id), 0) + 1,
          title,
          userId,
          completed: false,
          user: selectedUser,
        },
      ]);
      setTitle('');
      setUserId(0);
    }
  };

  const normalizedTodos = todos
    .map(todo => {
      if ('user' in todo && todo.user) {
        return todo as TodoWithUser;
      }

      const user = usersFromServer.find(
        item => item.id === (todo as Todos).userId,
      );

      if (!user) {
        return null;
      }

      return {
        ...(todo as Todos),
        user,
      } as TodoWithUser;
    })
    .filter((todo): todo is TodoWithUser => Boolean(todo));

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
            onChange={handleInputChange}
            placeholder="Enter a title"
          />

          {isSubmitted && hasErrorInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSubmitted && hasErrorSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={normalizedTodos} users={usersFromServer} />
    </div>
  );
};
