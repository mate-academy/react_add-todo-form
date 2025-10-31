import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setError(false);
  };

  const addTodo = () => {
    const id: number =
      visibleTodos.reduce((acc, to) => {
        if (to.id > acc) {
          return to.id;
        }

        return acc;
      }, 0) + 1;

    const todo = {
      id,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setVisibleTodos(prevTodos => [...prevTodos, todo]);
  };

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      setError(true);

      return;
    }

    addTodo();
    reset();
  };

  const usersToChoose = usersFromServer.map(user => {
    return {
      value: user.id,
      text: user.name,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        onSubmit={event => handleSubmission(event)}
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            placeholder="add a title"
            onChange={event => {
              setTitle(event.target.value);
            }}
            data-cy="titleInput"
            value={title}
          />
          {!title && error && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            onChange={event => {
              setUserId(Number(event.target.value));
            }}
            value={userId}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersToChoose.map(user => (
              <option key={user.value} value={user.value}>
                {user.text}
              </option>
            ))}
          </select>

          {!userId && error && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
