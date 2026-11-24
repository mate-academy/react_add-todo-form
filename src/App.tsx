import { useState, type FormEvent } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  if (!user) {
    throw new Error(`User not found for TODO ${todo.id}`);
  }

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    setTitleError(!trimmedTitle);
    setUserError(!selectedUser);

    if (!trimmedTitle || !selectedUser) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: trimmedTitle,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>

          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>
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
