import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWUser } from './types/TodoWUser';

function preparedTodos(todos: TodoWUser[]): TodoWUser[] {
  return todos.map(todo => {
    const user = usersFromServer.find((u) => u.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
}

function getMaxTodoId(todos: TodoWUser[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0);
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const prepTodos: TodoWUser[] = preparedTodos(todos);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserIdError(true);
    }

    if (title === '' || userId === 0) {
      return;
    }

    const newTodo: TodoWUser = {
      id: getMaxTodoId(todos) + 1,
      title,
      completed: false,
      userId,
    };

    setTodos(current => [...current, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {userIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={prepTodos} />
    </div>
  );
};
