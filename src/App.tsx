import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: selectedUser,
      completed: false,
    };

    setTitle('');
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setSelectedUser(null);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(
                event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g, ''),
              );
              setTitleError(false);
            }}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser ?? ''}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedUser(Number(event.target.value));
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

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
