import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showedTodos, setShowedTodos] = useState(todos);
  const [titleError, setTitleError] = useState(true);
  const [userError, setUserError] = useState(true);

  const addTodo = (id: number) => {
    const maxId = Math.max(...showedTodos.map(todo => todo.id)) + 1;

    if (getUser(id) && title.trim()) {
      const newTodo = {
        id: maxId,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      setShowedTodos(currentTodos => {
        return [
          ...currentTodos,
          newTodo,
        ];
      });

      setUserId(0);
      setTitle('');
    }

    if (!userId) {
      setUserId(0);
      setUserError(false);
    }

    if (!title.trim()) {
      setTitleError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
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
            Title:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titileInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(true);
            }}
          />

          {!titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={showedTodos} />
    </div>
  );
};
