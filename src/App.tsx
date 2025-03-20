import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  // Enrich initial todos with user data
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = usersFromServer.find(auser => auser.id === todo.userId);

        return user ? { ...todo, user } : null;
      })
      .filter((todo): todo is Todo => todo !== null),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [error, setError] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setError(prev => ({ ...prev, title: true }));
      hasError = true;
    }

    if (selectedUserId === 0) {
      setError(prev => ({ ...prev, user: true }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(auser => auser.id === selectedUserId);

    if (!user) {
      setError(prev => ({ ...prev, user: true }));

      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
    setError({ title: false, user: false });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9 ]/g, ''));
    setError(prev => ({ ...prev, title: false }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setError(prev => ({ ...prev, user: false }));
  };

  return (
    <div className="App">
      <h1>Add Todo Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
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
          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
