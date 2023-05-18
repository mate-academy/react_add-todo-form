import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);

  const addTodo = () => {
    if (userId && title) {
      const newId = Math.max(...todos.map(todo => todo.id)) + 1;

      const newTodo: Todo = {
        id: newId,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      setNewTodos([...todos, newTodo]);

      setTitle('');
      setUserId(0);
      setIsTitleError(false);
      setIsUserError(false);
    }

    if (!title) {
      setIsTitleError(true);
    }

    if (!userId) {
      setIsUserError(true);
    }
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handelSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              )})}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
