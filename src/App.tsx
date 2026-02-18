import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) as User,
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = userId === 0;

    if (isTitleInvalid || isUserInvalid) {
      setTitleError(isTitleInvalid);
      setUserError(isUserInvalid);

      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    if (selectedUser) {
      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        userId,
        user: selectedUser,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (titleError) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              if (userError) {
                setUserError(false);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
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
