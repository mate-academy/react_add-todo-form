import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const [newTodos, setNewTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId && title) {
      const newId = Math.max(...newTodos.map(todo => todo.id)) + 1;

      const newTodo = {
        id: newId,
        userId,
        completed: false,
        title,
        user: getUserById(userId),
      };

      setNewTodos((currentTodos) => ([...currentTodos, newTodo]));

      setUserId(0);
      setTitle('');
      setIsUserError(false);
      setIsTitleError(false);
    }

    if (!userId) {
      setIsUserError(true);
    }

    if (!title) {
      setIsTitleError(true);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              name="user"
              value={userId}
              onChange={handleUserId}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id} key={id}>{name}</option>
                );
              })}
            </select>
          </label>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
