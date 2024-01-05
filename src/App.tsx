import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';

function getUserById(userId: number) {
  return usersFromServer.find((user) => user.id === userId)
    || null;
}

const initialTodos:Todos[] = todosFromServer.map((todos) => ({
  ...todos,
  user: getUserById(todos.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = (newTodo: Todos) => {
    setTodos(todo => [...todo, newTodo]);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);

      return;
    }

    if (userId === 0) {
      setUserError(true);

      return;
    }

    setTitleError(!title);
    setUserError(!userId);

    if (title && userId) {
      setTitle('');
      setUserId(0);
    }

    if (title && userId) {
      addTodo({
        id: Math.max(...todos.map((todo) => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: &nbsp;&nbsp;</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          <div>
            {titleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="user">User: &nbsp;</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <div>
            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
