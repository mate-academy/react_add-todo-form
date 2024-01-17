import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type PrepareTodo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number
  user?: {
    id: number,
    name: string,
    username: string,
    email: string
  },
};

type TodoFunc = () => PrepareTodo[];

export const App = () => {
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [title, setTitle] = useState('');

  const prepareTodos: TodoFunc = () => {
    if (!todosFromServer || !usersFromServer) {
      return [];
    }

    const todosWithUsers = todosFromServer.map((todo) => {
      const ourUser = usersFromServer.find((user) => todo.userId === user.id);

      return {
        ...todo,
        user: ourUser,
      };
    });

    return todosWithUsers;
  };

  const todos = prepareTodos();
  const [readyTodos, setReadyTodos] = useState(todos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);

    const theBiggestId = readyTodos.map((todo) => todo.id)
      .sort((id1, id2) => id2 - id1)[0] + 1;

    if (userId && title) {
      setReadyTodos(currentTodos => [...currentTodos, {
        id: theBiggestId,
        title,
        completed: false,
        userId,
        user: usersFromServer.find((user) => user.id === userId),
      }]);

      setUserId(0);
      setTitle('');
    }

    if (hasUserIdError) {
      setUserId(0);
    }

    if (hasTitleError) {
      setTitle('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="add todo"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={readyTodos} />
    </div>
  );
};
