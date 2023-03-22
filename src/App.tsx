import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Input, Select, Submit } from './types/events';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

// const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
//   ...todo,
//   user: getUser(todo.userId),
// }));

export const App = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })),
  );

  const handleInputChange = (event: Input) => {
    const { value } = event.target;

    setTitle(value);

    if (!title) {
      setIsTitle(false);
    }
  };

  const handleSelectChange = (event: Select) => {
    const { value } = event.target;

    setUser(value);

    if (!user) {
      setIsUser(false);
    }
  };

  const handleSubmit = (event: Submit) => {
    event.preventDefault();

    if (!user) {
      setIsUser(true);
    }

    if (!title || !title.trim()) {
      setIsTitle(true);
      setTitle('');
    }

    if (title.trim() && user) {
      const todo = {
        id: Math.max(...todos.map(({ id }) => id)) + 1,
        title,
        completed: false,
        userId: +user,
        user: getUser(+user),
      };

      setTodos((prevTodos: Todo[]): Todo[] => [
        ...prevTodos,
        todo,
      ]);

      setTitle('');
      setUser('');
    }
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
          <label htmlFor="titleInput">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputChange}
            />
          </label>
          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              data-cy="userSelect"
              name="userSelect"
              id="userSelect"
              value={user}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>
          {isUser && (
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
