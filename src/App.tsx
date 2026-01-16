import './App.scss';

import { useState } from 'react';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const getUserById = (id: number): User | undefined => {
    return usersFromServer.find(user => user.id === id);
  };

  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = getUserById(todo.userId);

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter((todo): todo is Todo => todo !== null),
  );
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (title.length === 0) {
      setTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const maxTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const foundUser = getUserById(userId);

    if (!foundUser) {
      setUserError(true);

      return;
    }

    const todo: Todo = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId,
      user: foundUser,
    };

    setUserId(0);
    setTitle('');
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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
