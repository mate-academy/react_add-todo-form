import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(({ id }) => id === userId);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const findMaxId = (todos: Todo[]) => Math.max(...todos.map(todo => todo.id));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [todos, setTodos] = useState(preparedTodos);
  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim().length;
    const isUserNotChosen = !selectedUser;

    setIsTitleError(isTitleEmpty);
    setIsUserError(isUserNotChosen);

    if (isTitleEmpty || isUserNotChosen) {
      return;
    }

    setTodos(current => {
      const id = findMaxId(current) + 1;
      const newTodo = {
        id,
        title,
        completed: false,
        userId: selectedUser.id,
        user: selectedUser,
      };

      return ([...current, newTodo]);
    });

    setTitle('');
    setSelectedUser(null);
    setIsUserError(false);
    setIsTitleError(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsTitleError(!value.length);

    setTitle(value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setIsUserError(value === '0');

    setSelectedUser(getUserById(Number(value)));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <h2>Please enter new user info:</h2>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:

            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleInputChange}
              placeholder="Enter new title"
            />
          </label>

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            <select
              data-cy="userSelect"
              value={selectedUser ? selectedUser.id : 0}
              onChange={handleSelectChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
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
